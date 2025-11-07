document.addEventListener('DOMContentLoaded', () => {
  // ------------------
  // SELECT ELEMENTS
  // ------------------
  const editIcons = document.getElementsByClassName('fa-pencil');
  const deleteIcons = document.getElementsByClassName('fa-trash');
  const editForm = document.querySelector('#edit-dream-form');
  const editSection = document.querySelector('#edit-section');
  const previewArea = document.querySelector('#preview-area');
  const cancelEditBtn = document.querySelector('#cancel-edit');
  
  console.log('Page loaded, elements found:', {
    editIcons: editIcons.length,
    deleteIcons: deleteIcons.length,
    editForm: !!editForm,
    editSection: !!editSection
  });

  // ------------------
  // DELETE DREAM
  // ------------------
  Array.from(deleteIcons).forEach(icon => {
    icon.addEventListener('click', e => {
      e.stopPropagation();
      const entry = e.target.closest('.entry');
      const dreamId = entry.dataset.id;


      fetch(`/dreams/${dreamId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      })
        .then(res => {
          if (res.ok) {
            entry.remove();
            console.log('Dream deleted successfully');
          } else {
            console.log('Failed to delete dream');
         
          }
        })
        .catch(err => {
          console.error('Delete error:', err);
       
        });
    });
  });

  // ------------------
  // EDIT DREAM (pencil icon)
  // ------------------
  console.log('Number of edit icons found:', editIcons.length);
  
  Array.from(editIcons).forEach((icon, index) => {
    console.log(`Setting up click handler for pencil icon ${index}`);
    
    icon.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      console.log('Pencil clicked!');

      const entry = e.target.closest('.entry');
      
      if (!entry) {
        console.error('Could not find parent .entry element');
        return;
      }

      const dreamId = entry.dataset.id;
      const titleElement = entry.querySelector('.entry-title');
      const contentElement = entry.querySelector('.entry-content p');
      const moodElement = entry.querySelector('.entry-mood');

      if (!titleElement || !contentElement) {
        console.error('Could not find title or content elements');
        return;
      }

      const title = titleElement.innerText;
      const content = contentElement.innerText;
      const mood = moodElement ? moodElement.innerText.replace('Mood: ', '') : '';

      console.log('Editing dream:', dreamId);

      if (previewArea) previewArea.hidden = true;
      
      if (editSection) {
        editSection.style.display = 'block';
        console.log('Edit section visible');
      }

      const dreamIdField = document.querySelector('#dreamId');
      const titleField = document.querySelector('#title');
      const contentField = document.querySelector('#content');
      const moodField = document.querySelector('#mood');
      
      if (dreamIdField) dreamIdField.value = dreamId;
      if (titleField) titleField.value = title;
      if (contentField) contentField.value = content;
      if (moodField) moodField.value = mood;

      if (editSection) {
        editSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ------------------
  // CANCEL EDIT
  // ------------------
  if (cancelEditBtn) {
    cancelEditBtn.addEventListener('click', () => {
      editSection.style.display = 'none';
      editForm.reset();
      console.log('Edit cancelled');
    });
  }

  // ------------------
  // HANDLE EDIT FORM SUBMISSION
  // ------------------
  if (editForm) {
    editForm.addEventListener('submit', async e => {
      e.preventDefault();

      const dreamId = document.querySelector('#dreamId').value;
      const title = document.querySelector('#title').value;
      const content = document.querySelector('#content').value;
      const mood = document.querySelector('#mood').value;

      console.log('Submitting update for dream:', dreamId);

      try {
        const res = await fetch(`/dreams/${dreamId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, content, mood })
        });

        if (res.ok) {
          const updatedDream = await res.json();
          console.log('Dream updated successfully:', updatedDream);

          const entry = document.querySelector(`.entry[data-id="${dreamId}"]`);
          if (entry) {
            entry.querySelector('.entry-title').innerText = updatedDream.title;
            entry.querySelector('.entry-content p').innerText = updatedDream.content;
            
            let moodElement = entry.querySelector('.entry-mood');
            if (updatedDream.mood) {
              if (moodElement) {
                moodElement.innerHTML = `<em>Mood: ${updatedDream.mood}</em>`;
              } else {
                const contentDiv = entry.querySelector('.entry-content');
                moodElement = document.createElement('div');
                moodElement.className = 'entry-mood';
                moodElement.innerHTML = `<em>Mood: ${updatedDream.mood}</em>`;
                contentDiv.after(moodElement);
              }
            } else if (moodElement) {
              moodElement.remove();
            }
          }

          editSection.style.display = 'none';
          editForm.reset();
          
   
        } else {
          const error = await res.json();
          console.error('Failed to update dream:', error);
        
        }
      } catch (err) {
        console.error('Error updating dream:', err);
     
      }
    });
  }
});