function toggleProfile() {
  const menu = document.getElementById("profileMenu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";

  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (user) {
    document.getElementById("profileName").innerText = user.name;
    document.getElementById("profileEmail").innerText = user.email;
  }
}

/* Close profile when clicking outside */
document.addEventListener("click", function (e) {
  const profile = document.querySelector(".profile-wrapper");
  if (!profile.contains(e.target)) {
    document.getElementById("profileMenu").style.display = "none";
  }
});
