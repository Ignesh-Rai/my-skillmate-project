function addReaction(btn) {
  const countSpan = btn.querySelector('span');
  let count = parseInt(countSpan.textContent);
  countSpan.textContent = count + 1;
}
