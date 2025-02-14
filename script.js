// 🌙 Dark Mode Toggle
const toggleBtn = document.getElementById("toggle-btn");
const body = document.body;
const darkMode = localStorage.getItem("dark-mode");

if (darkMode === "enabled") {
  body.classList.add("dark");
  toggleBtn.classList.replace("fa-sun", "fa-moon");
}

toggleBtn.onclick = () => {
  if (body.classList.contains("dark")) {
    body.classList.remove("dark");
    toggleBtn.classList.replace("fa-moon", "fa-sun");
    localStorage.setItem("dark-mode", "disabled");
  } else {
    body.classList.add("dark");
    toggleBtn.classList.replace("fa-sun", "fa-moon");
    localStorage.setItem("dark-mode", "enabled");
  }
};

// 📌 Xử lý giao diện người dùng
const profile = document.querySelector(".header .flex .profile");
document.querySelector("#user-btn").onclick = () => {
  profile.classList.toggle("active");
  search.classList.remove("active");
};

const search = document.querySelector(".header .flex .search-form");
document.querySelector("#search-btn").onclick = () => {
  search.classList.toggle("active");
  profile.classList.remove("active");
};

const sideBar = document.querySelector(".side-bar");
document.querySelector("#menu-btn").onclick = () => {
  sideBar.classList.toggle("active");
  body.classList.toggle("active");
};

document.querySelector("#close-btn").onclick = () => {
  sideBar.classList.remove("active");
  body.classList.remove("active");
};

window.onscroll = () => {
  profile.classList.remove("active");
  search.classList.remove("active");

  if (window.innerWidth < 1200) {
    sideBar.classList.remove("active");
    body.classList.remove("active");
  }
};

// 🔑 Kiểm tra mật khẩu trước khi upload
const CORRECT_PASSWORD = "0UzJF&6daAN3$d!M";

function checkPassword() {
  const passwordInput = document.getElementById("password").value;
  const uploadBtn = document.getElementById("uploadBtn");

  if (passwordInput === CORRECT_PASSWORD) {
    alert("✅ Mật khẩu đúng! Bạn có thể upload video.");
    uploadBtn.disabled = false;
  } else {
    alert("❌ Mật khẩu sai! Vui lòng thử lại.");
    uploadBtn.disabled = true;
  }
}

// 🎥 Upload Video lên YouTube
async function uploadVideo() {
  const fileInput = document.getElementById("videoInput");
  const titleInput = document.getElementById("videoTitle").value.trim();
  const privacyStatus = document.getElementById("privacyStatus").value;

  if (!fileInput.files.length) {
    alert("⚠️ Vui lòng chọn video.");
    return;
  }
  if (!titleInput) {
    alert("⚠️ Vui lòng nhập tiêu đề video.");
    return;
  }

  document.getElementById("status").innerText = "⏳ Đang tải lên...";

  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      document.getElementById("status").innerText = "❌ Lỗi xác thực!";
      return;
    }

    const file = fileInput.files[0];
    const metadata = {
      snippet: {
        title: titleInput,
        description: "Uploaded via API",
        tags: ["test", "api"],
        categoryId: "22",
      },
      status: {
        privacyStatus: privacyStatus,
      },
    };

    const formData = new FormData();
    formData.append(
      "metadata",
      new Blob([JSON.stringify(metadata)], { type: "application/json" })
    );
    formData.append("video", file);

    const uploadUrl =
      "https://www.googleapis.com/upload/youtube/v3/videos?uploadType=multipart&part=snippet,status";

    const res = await fetch(uploadUrl, {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}` },
      body: formData,
    });

    const result = await res.json();
    if (result.id) {
      document.getElementById(
        "status"
      ).innerText = `✅ Upload thành công! Video ID: ${result.id} (${privacyStatus})`;
    } else {
      throw new Error("Upload thất bại: " + JSON.stringify(result));
    }
  } catch (error) {
    document.getElementById("status").innerText =
      "❌ Upload lỗi: " + error.message;
    console.error(error);
  }
}

// 🚀 Lấy Access Token từ Google OAuth 2.0
const CLIENT_ID =
  "362075565125-cdae02eaqqh3vqtgolqdab4gbk3vqu44.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REFRESH_TOKEN =
  "1//0emJ826LAigdbCgYIARAAGA4SNwF-L9Irva8a3-gGMQKiUjzL9mW7eRJXYJPrN2sNJeXDAD9gO_3Spm7ZdBZQjSKsH6aE_5APi20";

async function getAccessToken() {
  try {
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        refresh_token: REFRESH_TOKEN,
        grant_type: "refresh_token",
      }),
    });

    const data = await response.json();
    if (data.access_token) {
      console.log("✅ Access Token lấy thành công!");
      return data.access_token;
    } else {
      console.error("❌ Lỗi khi lấy Access Token:", data);
      document.getElementById("status").innerText = "❌ Lỗi lấy Access Token!";
      return null;
    }
  } catch (error) {
    console.error("❌ Lỗi kết nối:", error);
    document.getElementById("status").innerText =
      "❌ Lỗi kết nối khi lấy Access Token!";
    return null;
  }
}
