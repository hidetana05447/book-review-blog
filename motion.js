// TOPページの演出（motion-prompt #074・#082 を参考）。CSSは motion.css
(function () {
  // #082 画像を枠で包む（枠は動かず、中身だけ拡大）
  document.querySelectorAll('.review-card .review-thumb').forEach(function (img) {
    var f = document.createElement('span');
    f.className = 'mr-thumb-frame';
    img.parentNode.insertBefore(f, img);
    f.appendChild(img);
  });

  // #074 カードが判定線（画面の高さの85%）を越えたら出す。同じ行は0.12秒ずつずらす。画面の下へ戻ったら見えない所で元に戻す
  var items = [].slice.call(document.querySelectorAll('.review-list > li'));
  function cols() { return getComputedStyle(document.querySelector('.review-list')).gridTemplateColumns.split(' ').length; }
  if (!('IntersectionObserver' in window)) { items.forEach(function (e) { e.classList.add('mr-in'); }); return; }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      var li = en.target;
      if (en.isIntersecting) {
        li.classList.remove('mr-reset');
        li.style.transitionDelay = (items.indexOf(li) % cols()) * 0.12 + 's';
        li.classList.add('mr-in');
      } else if (en.boundingClientRect.top > 0) {
        li.classList.add('mr-reset');
        li.style.transitionDelay = '0s';
        li.classList.remove('mr-in');
      }
    });
  }, { rootMargin: '0px 0px -15% 0px', threshold: 0 });
  items.forEach(function (e) { io.observe(e); });
})();
