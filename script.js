document.addEventListener("DOMContentLoaded", function () {
    const videoContainer = document.querySelector(".video-container");
    const prevButton = document.getElementById("prevPage");
    const nextButton = document.getElementById("nextPage");
    const pageNumber = document.getElementById("pageNumber");

    const videoLinks = [
        "296MCRk9eKY","HqphVfNw8pM", "ocH25NyFkDs", "DpYn_S2gU1s", "CnG1m06KcnU", "OVq7CiFqWfk",
        "wBO62lxfYMc", "IpUEkRpm8ZQ", "2m1IaWraAxU", "o5wyeAnsqzQ", "FKxwdsJVozY",
        "n1g6aArl_s8", "kP9x2d1E_hY", "s3YCsOCcfEI", "dCMpVlas7-Y", "75-jm6qiKhs"
    ].reverse(); // Đảo ngược video mới nhất lên đầu

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
