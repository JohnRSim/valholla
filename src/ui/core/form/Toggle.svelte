<script>

</script>

<style>
	
#cover {
  width: 100px;
  height: 50px;
  margin: 0 auto;
  position: relative;
}

#checkbox {
  margin: 0px;
  width: 100%;
  height: 50px;
  cursor: pointer;
  opacity: 0;
  position: relative;
  z-index: 3;
}

#bar {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background-color: #3dd897;
  z-index: 1;
  border-radius: 50px;
}

#knob {
  position: absolute;
  top: 8px;
  left: 8px;
  width: 34px;
  height: 34px;
  background-color: #fff;
  border-radius: 50%;
  transition: left 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28), margin-left 0.3s ease, width 0.3s ease, border-radius 0.3s ease;
  box-shadow: 0px 1px 1px #7d7d7d;
  z-index: 2;
}

#checkbox:active ~ #knob {
  width: 66px;
  border-radius: 20px;
}

#checkbox:checked ~ #knob {
  left: 58px;
}

#checkbox:checked ~ #bar {
  background-color: #00bcd4;
}

#checkbox:checked:active ~ #knob {
  margin-left: -32px;
}
</style>

<div id="cover">
  <input type="checkbox" id="checkbox">
  <div id="bar"></div>
  <div id="knob"></div>
</div>