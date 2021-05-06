let setValue = function(el, binding) {
  let value = binding.value;
  let dateArray = value.split(' ');
  //let monthsArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  el.innerText =  `${dateArray[2]} ${dateArray[1]} ${dateArray[3]}`;
};
module.exports = {
  isLiteral: true,
  bind(el, binding) {
    setValue(el, binding);
  },
  update(el, binding) {
    setValue(el, binding);
  }
}
