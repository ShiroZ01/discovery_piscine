(function () {
  const LIST_ID = 'ft_list';
  const COOKIE_KEY = 'ft_todos';
  const COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

  const listEl = document.getElementById(LIST_ID);
  const newBtn = document.getElementById('btn-new');

  function setCookie(name, value, maxAgeSeconds) {
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; max-age=${maxAgeSeconds}; path=/`;
  }
  function getCookie(name) {
    const target = `${encodeURIComponent(name)}=`;
    return document.cookie
      .split(';')
      .map(s => s.trim())
      .find(c => c.startsWith(target))
      ?.slice(target.length) || null;
  }

  function loadTodos() {
    const raw = getCookie(COOKIE_KEY);
    if (!raw) return [];
    try {
      const arr = JSON.parse(decodeURIComponent(raw));
      return Array.isArray(arr) ? arr : [];
    } catch {
      return [];
    }
  }
  function saveTodos(arr) {
    const raw = JSON.stringify(arr);
    setCookie(COOKIE_KEY, raw, COOKIE_MAX_AGE);
  }

  function renderEmptyState() {
    if (listEl.children.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'empty';
      empty.textContent = 'ยังไม่มีงาน — กดปุ่ม Add Task เพื่อเริ่ม';
      listEl.appendChild(empty);
    }
  }
  function clearEmptyState() {
    const empty = listEl.querySelector('.empty');
    if (empty) empty.remove();
  }

  function makeTodoDiv(text) {
    const div = document.createElement('div');
    div.className = 'todo';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    const span = document.createElement('span');
    span.textContent = text;

    checkbox.addEventListener('change', () => {
      div.classList.toggle('done', checkbox.checked);
    });

    div.addEventListener('dblclick', () => {
      const ok = confirm(`ลบงานนี้ไหม?\n\n• ${text}`);
      if (ok) {
        div.remove();
        const arr = getTodosFromDOM();
        saveTodos(arr);
        if (arr.length === 0) renderEmptyState();
      }
    });

    div.appendChild(checkbox);
    div.appendChild(span);

    return div;
  }

  function getTodosFromDOM() {
    return Array.from(listEl.querySelectorAll('.todo span')).map(el => el.textContent);
  }

  function addNewTodo() {
    let text = prompt('พิมพ์งานที่ต้องการเพิ่ม:');
    if (text === null) return;
    text = text.trim();
    if (!text) return;

    clearEmptyState();

    const node = makeTodoDiv(text);
    listEl.prepend(node);

    const arr = getTodosFromDOM();
    saveTodos(arr);
  }

  function initialRender() {
    const todos = loadTodos();
    if (todos.length === 0) {
      renderEmptyState();
      return;
    }
    todos.forEach((t) => {
      const node = makeTodoDiv(String(t));
      listEl.appendChild(node);
    });
  }

  newBtn.addEventListener('click', addNewTodo);
  initialRender();
})();
