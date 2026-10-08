(() => {
  const notice = document.querySelector('#notice');
  let timer;
  const announce = message => {
    clearTimeout(timer);
    notice.textContent = message;
    notice.hidden = false;
    timer = setTimeout(() => { notice.hidden = true; }, 7000);
  };
  async function copy(value) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(value);
      } else {
        const input = document.createElement('textarea');
        input.value = value;
        input.setAttribute('readonly', '');
        input.style.cssText = 'position:fixed;left:-9999px';
        document.body.append(input);
        input.select();
        const ok = document.execCommand('copy');
        input.remove();
        if (!ok) throw new Error('copy unavailable');
      }
      announce('地址已复制，可粘贴保存。');
    } catch {
      announce('请手动复制此完整地址：' + value);
    }
  }
  document.querySelectorAll('[data-copy]').forEach(button => {
    button.addEventListener('click', () => copy(button.dataset.copy));
  });
  document.querySelectorAll('[data-bookmark]').forEach(button => {
    button.addEventListener('click', () => announce(/Android|iPhone|iPad/i.test(navigator.userAgent)
      ? '打开浏览器菜单，选择添加书签或添加到主屏幕。'
      : '使用浏览器菜单添加书签，也可按 Ctrl+D（Mac 为 ⌘D）。'));
  });
  const checks = [...document.querySelectorAll('.checklist input')];
  const progress = document.querySelector('.check-progress');
  checks.forEach(input => input.addEventListener('change', () => {
    const count = checks.filter(check => check.checked).length;
    progress.textContent = `阅读确认 ${count} / ${checks.length}。此清单仅记录本页勾选，不检测账户或节点状态。`;
  }));
})();
