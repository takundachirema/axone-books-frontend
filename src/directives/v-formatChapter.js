let setValue = function(el, binding) {
    let value = parseFloat(binding.value).toString();
    el.innerText =  'Chapter: '+value;
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
  