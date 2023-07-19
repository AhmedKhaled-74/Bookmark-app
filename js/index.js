var siteName = document.getElementById("siteName");
var siteNameFeedback = document.getElementById("siteNameFeedback");
var siteUrl = document.getElementById("siteUrl");
var siteUrlFeedback = document.getElementById("siteUrlFeedback");
var btnSub = document.getElementById("btnSub");
var cta = document.getElementById("cta");
var deleteBtnAction = document.getElementById("deleteBtnAction");
var tBody = document.getElementById("tBody");
var checkingMark = document.querySelectorAll(".checking");

var siteList = JSON.parse(localStorage.getItem("sites")) || [];
displaySite();

var siteExists = false;
btnSub.onclick = function (event) {
  event.preventDefault();
  siteExists = false;
  for (i = 0; i < siteList.length; i++) {
    if (siteName.value == siteList[i].sName) {
      siteExists = true;
      break;
    }
  }

  if (
    regexName.test(siteName.value) &&
    regexUrl.test(siteUrl.value) &&
    siteExists == false
  ) {
    addSite();
    clearForm();
  } else if (siteName.value == "") {
    siteNameFeedback.innerHTML = "Site name required";
    validName();
  } else if (siteExists == true) {
    siteNameFeedback.innerHTML = "Site name must unique";
    validName();
  } else if (siteName.value !== "" && regexName.test(siteName.value) == false) {
    siteNameFeedback.innerHTML =
      "Site name must be between 3 and 15 letter only capital or small";
    validName();
  } else if (regexName.test(siteName.value)) {
    siteNameFeedback.innerHTML = "";
    validName();
  }
  if (siteUrl.value == "") {
    siteUrlFeedback.innerHTML = "Site Url required";
    validUrl();
  } else if (regexUrl.test(siteUrl.value)) {
    siteUrlFeedback.innerHTML = "";
    validUrl();
  } else if (siteUrl.value !== "" && regexUrl.test(siteUrl.value) == false) {
    siteUrlFeedback.innerHTML = `A valid URL starts with "http://" or "https://", includes the domain name and path/query parameters, and doesn't have spaces or whitespace characters.`;
    validUrl();
  }
};

function addSite() {
  var site = {
    sName: siteName.value,
    sUrl: siteUrl.value,
  };
  siteList.push(site);
  localStorage.setItem("sites", JSON.stringify(siteList));
  displaySite();
}

function displaySite() {
  box = "";
  for (i = 0; i < siteList.length; i++) {
    box += `
    <tr>
              <td>
                <span class="data">${i + 1}</span>
              </td>
              <td>
                <span class="data"><i class="fa-brands icon fa-${siteList[
                  i
                ].sName
                  .split(" ")[0]
                  .toLowerCase()}"></i></span>
              </td>
              <td>
                <span class="data">${siteList[i].sName}</span>
              </td>
              <td>
                <button class="btn btn-success mx-auto p-0">
                  <a
                    href="${siteList[i].sUrl}"
                    target="_blank"
                    class="text-reset text-decoration-none d-flex align-items-center justify-content-center gap-2 px-2 py-1 py-md-2 px-md-3 "
                  >
                    <span><i class="fa fa-eye" aria-hidden="true"></i></span
                    ><span>Visit</span>
                  </a>
                </button>
              </td>
              <td>
                <button
                  onclick="deleteBtnAction.onclick = function () {
                  deleteSite(${i});
                };"
                  class="btn btn-danger d-flex align-items-center justify-content-center gap-2 mx-auto px-2 py-1 py-md-2 px-md-3"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <span><i class="fas fa-trash-alt"></i></span
                  ><span>Delete</span>
                </button>
              </td>
            </tr>
    `;
  }
  tBody.innerHTML = box;
}

function deleteSite(deleteIndex) {
  siteList.splice(deleteIndex, 1);
  displaySite();
  localStorage.setItem("sites", JSON.stringify(siteList));
}

siteName.addEventListener("keyup", () => {
  validName();
});
siteUrl.addEventListener("keyup", () => {
  validUrl();
});

var regexName = /^[A-Z a-z]{3,15}$/;
function validName() {
  if (regexName.test(siteName.value)) {
    siteName.style.cssText = `
    border:1px solid #3ea55b;
    box-shadow: 0 0 0 0.25rem #3ea55ba9;
    `;
    checkingMark.forEach((element) => {
      element.style.cssText = `
      border:1px solid #3ea55b;
      color: #3ea55b;
      `;
      element.firstElementChild.classList.add("d-none");
      element.lastElementChild.classList.remove("d-none");
    });
  } else {
    siteName.style.cssText = `
    border:1px solid #bb2020;
    box-shadow: 0 0 0 0.25rem #bb2020b2 ;
    `;
    checkingMark.forEach((element) => {
      element.style.cssText = `
      border:1px solid #bb2020;
      color: #bb2020;
      `;
      element.firstElementChild.classList.remove("d-none");
      element.lastElementChild.classList.add("d-none");
    });
  }
}
var regexUrl =
  /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
function validUrl() {
  if (regexUrl.test(siteUrl.value)) {
    siteUrl.style.cssText = `
    border:1px solid #3ea55b;
    box-shadow: 0 0 0 0.25rem #3ea55ba9;
    `;
    checkingMark.forEach((element) => {
      element.style.cssText = `
      border:1px solid #3ea55b;
      color: #3ea55b;
      `;
      element.firstElementChild.classList.add("d-none");
      element.lastElementChild.classList.remove("d-none");
    });
  } else {
    siteUrl.style.cssText = `
    border:1px solid #bb2020;
    box-shadow: 0 0 0 0.25rem #bb2020b2 ;
    `;
    checkingMark.forEach((element) => {
      element.style.cssText = `
      border:1px solid #bb2020;
      color: #bb2020;
      `;
      element.firstElementChild.classList.remove("d-none");
      element.lastElementChild.classList.add("d-none");
    });
  }
}
function clearForm() {
  siteName.value = "";
  siteUrl.value = "";
  siteNameFeedback.innerHTML = "";
  siteUrlFeedback.innerHTML = "";
  siteName.style.cssText = `
  border: none;
  box-shadow: none;

  `;
  siteUrl.style.cssText = `
  border: none;

  box-shadow: none;
  `;
  checkingMark.forEach((element) => {
    element.style.cssText = `
  border: none;
  `;
    element.firstElementChild.classList.add("d-none");
    element.lastElementChild.classList.add("d-none");
  });
}
