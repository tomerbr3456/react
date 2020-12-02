export async function addTodo(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  });
  return response.json();
}

export async function deleteTodo(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
  });
  return response.json();
}


export async function updateTodo(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return response.json();
}