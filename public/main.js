// document.addEventListener('DOMContentLoaded', () => {
//   document.querySelectorAll('.entry').forEach(entry => {
//     const id = entry.querySelector('.delete-btn').dataset.id;
//     const titleEl = entry.querySelector('.entry-title');
//     const contentEl = entry.querySelector('.entry-content p');
//     const editBtn = entry.querySelector('.btn-info');
//     const deleteBtn = entry.querySelector('.delete-btn');

//     // DELETE
//     deleteBtn?.addEventListener('click', () => {
//       fetch(`/dreams/${id}`, { method: 'DELETE' })
//         .then(res => {
//           if (res.ok) {
//             // Remove the entry from the DOM
//             entry.remove();
//           } else {
//             console.log('Failed to delete dream');
//           }
//         })
//         .catch(err => console.log(err));
//     });

//     // EDIT (inline)
//     editBtn?.addEventListener('click', (e) => {
//       e.preventDefault();

//       // Replace title and content with inputs
//       const titleInput = document.createElement('input');
//       titleInput.type = 'text';
//       titleInput.value = titleEl.innerText;
//       titleInput.classList.add('entry-title-input');
//       titleEl.replaceWith(titleInput);

//       const contentInput = document.createElement('textarea');
//       contentInput.value = contentEl.innerText;
//       contentInput.classList.add('entry-content-input');
//       contentEl.replaceWith(contentInput);

//       // Create SAVE button
//       const saveBtn = document.createElement('button');
//       saveBtn.innerText = 'Save';
//       saveBtn.classList.add('btn', 'btn-success');
//       editBtn.replaceWith(saveBtn);

// // fetch(`/dreams/${id}`, {
// //   method: 'PUT',
// //   headers: { 'Content-Type': 'application/json' },
// //   body: JSON.stringify({ title, content })
// // // })


//     });
//   });
// });


document.addEventListener('DOMContentLoaded', () => {
  let dreams = document.querySelectorAll(".entry");
  let editIcons = document.getElementsByClassName("fa-pen");
  let deleteIcons = document.getElementsByClassName("fa-trash");
  let preview = null;
  let isPreviewMode = false;

  // ------------------
  // DELETE DREAM
  // ------------------
  Array.from(deleteIcons).forEach(icon => {
    icon.addEventListener('click', e => {
      e.stopPropagation();
      const dreamId = e.target.closest('.entry').dataset.id;

      fetch(`/dreams/${dreamId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      })
        .then(res => {
          if (res.ok) window.location.reload();
        })
        .catch(err => console.log(err));
    });
  });

  // ------------------
  // EDIT DREAM
  // ------------------
  Array.from(editIcons).forEach(icon => {
    icon.addEventListener('click', async e => {
      e.stopPropagation();

      // destroy preview mode
      if (preview) {
        preview.toTextArea();
        preview = null;
        isPreviewMode = false;
      }

      // show form, hide preview area
      document.querySelector('form').style.display = 'block';
      document.querySelector('#preview-area').hidden = true;
      document.querySelector('#preview-area').innerHTML = '';

      const dreamId = e.target.closest('.entry').dataset.id;
      const res = await fetch(`/dreams/${dreamId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await res.json();

      // populate form
      document.querySelector('#title').value = data.title;
      document.querySelector('#content').value = data.content;

      // update submit button
      document.querySelector('button[type="submit"]').innerText = "Update Dream";

      // store dream id for update
      document.querySelector('#dreamId').value = dreamId;
    });
  });

  // ------------------
  // PREVIEW DREAM
  // ------------------
  dreams.forEach(dream => {
    dream.addEventListener('click', async e => {
      const dreamId = e.currentTarget.dataset.id;

      const res = await fetch(`/dreams/${dreamId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await res.json();

      // hide form, show preview
      document.querySelector('form').style.display = 'none';
      const previewArea = document.querySelector('#preview-area');
      previewArea.hidden = false;

      // show title + content
      previewArea.innerHTML = `
        <h2>${data.title}</h2>
        <p>${data.content}</p>
      `;
    });
  });
});
