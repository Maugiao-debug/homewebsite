document.addEventListener("DOMContentLoaded", function () {
    const videoContainer = document.querySelector(".video-container");
    const prevButton = document.getElementById("prevPage");
    const nextButton = document.getElementById("nextPage");
    const pageNumber = document.getElementById("pageNumber");

    const videoLinks = [
        "296MCRk9eKY",
    "99TqSJGd10U",
    "QS1ggZk8M0Q",
    "7ZIXddOFt-M",
    "xwlLNY_EO3Q",
    "75-jm6qiKhs",
    "dCMpVlas7-Y",
    "s3YCsOCcfEI",
    "kP9x2d1E_hY",
    "n1g6aArl_s8",
    "FKxwdsJVozY",
    "o5wyeAnsqzQ",
    "2m1IaWraAxU",
    "IpUEkRpm8ZQ",
    "wBO62lxfYMc",
    "OVq7CiFqWfk",
    "CnG1m06KcnU",
    "DpYn_S2gU1s",
    "ocH25NyFkDs",
    "HqphVfNw8pM"
    ]

    let currentPage = 1;
    const videosPerPage = 6;
    const totalPages = Math.ceil(videoLinks.length / videosPerPage);

    function loadVideos(page) {
        videoContainer.innerHTML = ""; // Xóa video cũ

        const start = (page - 1) * videosPerPage;
        const end = start + videosPerPage;
        const videosToShow = videoLinks.slice(start, end);

        videosToShow.forEach(videoId => {
            const videoBox = document.createElement("div");
            videoBox.classList.add("video-box");

            const iframe = document.createElement("iframe");
            iframe.src = `https://www.youtube.com/embed/${videoId}`;
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
            iframe.allowFullscreen = true;

            videoBox.appendChild(iframe);
            videoContainer.appendChild(videoBox);
        });

        pageNumber.innerText = `Trang ${currentPage} / ${totalPages}`;
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages;
    }

    prevButton.addEventListener("click", function () {
        if (currentPage > 1) {
            currentPage--;
            loadVideos(currentPage);
        }
    });

    nextButton.addEventListener("click", function () {
        if (currentPage < totalPages) {
            currentPage++;
            loadVideos(currentPage);
        }
    });

    loadVideos(currentPage); // Load trang đầu tiên
});

document.addEventListener("DOMContentLoaded", function () {
    const logo = document.querySelector(".main .logo");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            logo.classList.add("shrink");
        } else {
            logo.classList.remove("shrink");
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const logo = document.querySelector(".main .logo");
    const logoText = document.querySelector(".main .logo .colum");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            logo.classList.add("shrink");
            logoText.classList.add("remove"); // Ẩn chữ
        } else {
            logo.classList.remove("shrink");
            logoText.classList.remove("remove"); // Hiện lại chữ
        }
    });
});
