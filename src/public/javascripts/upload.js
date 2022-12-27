const imagekit = new ImageKit({
  publicKey: 'public_xTbc2crb6gXYxB5gtKroms4tWCU=',
  urlEndpoint: 'https://ik.imagekit.io/0o9nfg6a3',
  authenticationEndpoint: 'http://localhost:3001/auth',
});

const showImg = (id, url) => {
  const img = document.getElementById(id);
  img.setAttribute('src', url);
};

function uploadImage(inputId, desId, callback, ...args) {
  const file = document.getElementById(inputId);
  const userImage = document.getElementById(desId);
  imagekit.upload(
    {
      file: file.files[0],
      fileName: file.files[0].name,
    },
    function (err, result) {
      userImage.setAttribute('value', result.url);
      callback(...args, result.url);
    }
  );
}

async function onSubmitHavingImgForm(formId) {
  const form = document.getElementById(formId);
  form.submit();
}
