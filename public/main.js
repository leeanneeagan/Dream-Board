// // var thumbUp = document.getElementsByClassName("fa-fa-magic");
// // var thumbDown = document.getElementsByClassName("fa-fa-cloud");
// // var trash = document.getElementsByClassName("fa-trash");

// // Array.from(cloud).forEach(function(element) {
// //       element.addEventListener('click', function(){
// //         const name = this.parentNode.parentNode.childNodes[1].innerText
// //         const msg = this.parentNode.parentNode.childNodes[3].innerText
// //         const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
// //         fetch('messages', {
// //           method: 'put',
// //           headers: {'Content-Type': 'application/json'},
// //           body: JSON.stringify({
// //             'name': name,
// //             'msg': msg,
// //             'thumbUp':thumbUp
// //           })
// //         })
// //         .then(response => {
// //           if (response.ok) return response.json()
// //         })
// //         .then(data => {
// //           console.log(data)
// //           window.location.reload(true)
// //         })
// //       });
// // });

// // Array.from(cloud).forEach(function(element) {
// //       element.addEventListener('click', function(){
// //         const name = this.parentNode.parentNode.childNodes[1].innerText
// //         const msg = this.parentNode.parentNode.childNodes[3].innerText
// //         const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
// //         fetch('messagesdown', {
// //           method: 'put',
// //           headers: {'Content-Type': 'application/json'},
// //           body: JSON.stringify({
// //             'name': name,
// //             'msg': msg,
// //             'thumbUp':thumbUp
// //           })
// //         })
// //         .then(response => {
// //           if (response.ok) return response.json()
// //         })
// //         .then(data => {
// //           console.log(data)
// //           window.location.reload(true)
// //         })
// //       });
// // });


// // Array.from(trash).forEach(function(element) {
// //       element.addEventListener('click', function(){
// //         const name = this.parentNode.parentNode.childNodes[1].innerText
// //         const msg = this.parentNode.parentNode.childNodes[3].innerText
// //         fetch('messages', {
// //           method: 'delete',
// //           headers: {
// //             'Content-Type': 'application/json'
// //           },
// //           body: JSON.stringify({
// //             'name': name,
// //             'msg': msg
// //           })
// //         }).then(function (response) {
// //           window.location.reload()
// //         })
// //       });
// // });


// // Select the right Font Awesome icons
// // var magicIcons = document.getElementsByClassName("fa-magic"); // sparkle
// // var cloudIcons = document.getElementsByClassName("fa-cloud"); // cloud
// // var trashIcons = document.getElementsByClassName("fa-trash"); // trash

// // MAGIC ICON – sends PUT request to /messages
// // Array.from(magicIcons).forEach(function(element) {
// //   element.addEventListener('click', function() {
// //     const name = this.parentNode.parentNode.childNodes[1].innerText;
// //     const msg = this.parentNode.parentNode.childNodes[3].innerText;
// //     const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText);

// //     fetch('messages', {
// //       method: 'put',
// //       headers: {'Content-Type': 'application/json'},
// //       body: JSON.stringify({
// //         'name': name,
// //         'msg': msg,
// //         'thumbUp': thumbUp
// //       })
// //     })
// //     .then(response => {
// //       if (response.ok) return response.json();
// //     })
// //     .then(data => {
// //       console.log('Magic update:', data);
// //       window.location.reload(true);
// //     });
// //   });
// // });

// // CLOUD ICON – sends PUT request to /messagesdown
// // Array.from(cloudIcons).forEach(function(element) {
// //   element.addEventListener('click', function() {
// //     const name = this.parentNode.parentNode.childNodes[1].innerText;
// //     const msg = this.parentNode.parentNode.childNodes[3].innerText;
// //     const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText);

// //     fetch('messagesdown', {
// //       method: 'put',
// //       headers: {'Content-Type': 'application/json'},
// //       body: JSON.stringify({
// //         'name': name,
// //         'msg': msg,
// //         'thumbUp': thumbUp
// //       })
// //     })
// //     .then(response => {
// //       if (response.ok) return response.json();
// //     })
// //     .then(data => {
// //       console.log('Cloud update:', data);
// //       window.location.reload(true);
// //     });
// //   });
// // });



// // Select only the cloud icons
// var cloudIcons = document.getElementsByClassName("fa-cloud");

// // CLOUD ICON – toggle like/unlike
// Array.from(cloudIcons).forEach(function(element) {
//   element.addEventListener('click', function() {
//     const name = this.parentNode.parentNode.childNodes[1].innerText;
//     const msg = this.parentNode.parentNode.childNodes[3].innerText;
//     const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText) || 0;

//     // Toggle "liked" state visually
//     this.classList.toggle('liked');

//     // Determine the new value (add or remove like)
//     const newThumbUp = this.classList.contains('liked') ? thumbUp + 1 : thumbUp - 1;

//     // Send PUT request
//     fetch('messages', {
//       method: 'put',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify({
//         'name': name,
//         'msg': msg,
//         'thumbUp': newThumbUp
//       })
//     })
//     .then(response => {
//       if (response.ok) return response.json();
//     })
//     .then(data => {
//       console.log('Cloud like/unlike:', data);
//       window.location.reload(true);
//     });
//   });
// });





// // TRASH ICON – sends DELETE request to /messages
// Array.from(trashIcons).forEach(function(element) {
//   element.addEventListener('click', function() {
//     const name = this.parentNode.parentNode.childNodes[1].innerText;
//     const msg = this.parentNode.parentNode.childNodes[3].innerText;

//     fetch('messages', {
//       method: 'delete',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify({
//         'name': name,
//         'msg': msg
//       })
//     }).then(function(response) {
//       window.location.reload();
//     });
//   });
// });



// Like button – cloud (+1)
Array.from(document.getElementsByClassName('like-btn')).forEach(element => {
  element.addEventListener('click', function() {
    const parent = this.parentNode;
    const name = parent.childNodes[0].innerText;
    const msg = parent.childNodes[1].innerText;
    const countEl = parent.querySelector('.vote-count');
    let count = parseInt(countEl.innerText) || 0;

    count += 1; // like
    countEl.innerText = count;

    fetch('/messages/vote', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ name, msg, votes: count })
    });
  });
});

// Dislike button – rain (-1)
Array.from(document.getElementsByClassName('dislike-btn')).forEach(element => {
  element.addEventListener('click', function() {
    const parent = this.parentNode;
    const name = parent.childNodes[0].innerText;
    const msg = parent.childNodes[1].innerText;
    const countEl = parent.querySelector('.vote-count');
    let count = parseInt(countEl.innerText) || 0;

    count -= 1; // dislike
    countEl.innerText = count;

    fetch('/messages/vote', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ name, msg, votes: count })
    });
  });
});

// Trash button – delete
Array.from(document.getElementsByClassName('trash-btn')).forEach(element => {
  element.addEventListener('click', function() {
    const messageLi = this.closest('li.message');
    const name = messageLi.querySelector('span:nth-child(1)').innerText;
    const msg = messageLi.querySelector('span:nth-child(2)').innerText;

    fetch('/messages', {
      method: 'delete',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ name, msg })
    }).then(res => {
      if (res.ok) window.location.reload();
    });
  });
});