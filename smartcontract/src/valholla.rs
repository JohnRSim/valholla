use solana_program::{
	account_info::{next_account_info, AccountInfo},
	entrypoint,
	entrypoint::ProgramResult,
	log::{sol_log_compute_units, sol_log_params, sol_log_slice},
	msg,
	program_error::ProgramError,
	pubkey::Pubkey,
};
use borsh::{BorshDeserialize, BorshSerialize};
use std::mem;
use std::str::from_utf8;

pub trait Serdes: Sized + BorshSerialize + BorshDeserialize {
	fn pack(&self, dst: &mut [u8]) {
		let encoded = self.try_to_vec().unwrap();
		dst[..encoded.len()].copy_from_slice(&encoded);
	}
	fn unpack(src: &[u8]) -> Result<Self, ProgramError> {
		Self::try_from_slice(src).map_err(|_| ProgramError::InvalidAccountData)
	}
}

#[derive(BorshSerialize, BorshDeserialize, PartialEq, Debug)]
pub struct Message {
	pub txt: String,
}

impl Serdes for Message {}

entrypoint!(entry);

fn entry(
	program_id: &Pubkey,
	accounts: &[AccountInfo],
	instruction_data: &[u8],
) -> ProgramResult {
	let accounts_iter = &mut accounts.iter();
	let account = next_account_info(accounts_iter)?;

	let mut data = account.try_borrow_mut_data()?;
	let mut unpacked = Message::unpack(&data).expect("Failed to read data");
	msg!("unpacked ${:?}",unpacked);

	let mut memo = from_utf8(instruction_data).map_err(|err| {
			msg!("Invalid UTF-8, from byte {}", err.valid_up_to());
			ProgramError::InvalidInstructionData
	})?;
	msg!("Memo (len {})", memo.len());

	// line needed here to add memo to unpacked data
	
	unpacked.pack(&mut data);
	Ok(())
}