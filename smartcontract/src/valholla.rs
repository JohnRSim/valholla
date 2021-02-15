use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
	account_info::{next_account_info, AccountInfo},
	entrypoint,
	entrypoint::ProgramResult,
	info,
	program_error::ProgramError,
	pubkey::Pubkey,
};
use std::mem;

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
  pub likes: u64,
  pub msg: String,
}

impl Serdes for Message {}

entrypoint!(entry);

fn entry(
		program_id: &Pubkey,
		accounts: &[AccountInfo],
		instruction_data: &[u8],
) -> ProgramResult {
		// Get the account to say hello to
		let accounts_iter = &mut accounts.iter();
		let account = next_account_info(accounts_iter)?;

		// The data must be large enough to hold a u64 count
		//if account.try_data_len()? < mem::size_of::<u32>() {
		//	info!("Greeted account data length too small for u32");
		//	return Err(ProgramError::InvalidAccountData);
		//}

		// Increment and store the number of times the account has been greeted
		

    let mut data = account.try_borrow_mut_data()?;
    let mut unpacked = Message::unpack(&data).expect("Failed to read data");
    
    unpacked.pack(&mut data);

    //let mut data = account.try_borrow_mut_data()?;
		//let mut num_greets = LittleEndian::read_u32(&data);
		//num_greets += 1;
		//LittleEndian::write_u32(&mut data[0..], num_greets);
    
		Ok(())
}