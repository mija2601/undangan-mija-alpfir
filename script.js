/* =====================================================
   OPEN INVITATION
===================================================== */

const cover = document.getElementById("cover");
const openButton = document.getElementById("openButton");
const invitation = document.getElementById("invitation");
const music = document.getElementById("weddingMusic");
const musicButton = document.getElementById("musicButton");


/* Tombol BUKA UNDANGAN */

if (openButton) {

    openButton.addEventListener("click", function () {

        /* Hilangkan cover */
        cover.classList.add("hide");

        /* Pastikan isi undangan muncul */
        invitation.style.display = "block";
        invitation.style.opacity = "1";
        invitation.style.visibility = "visible";

        /* Aktifkan scroll */
        document.body.style.overflowY = "auto";

        /* Coba putar musik */
        if (music) {

            music.play()
                .then(function () {

                    musicButton.textContent = "❚❚";

                })
                .catch(function () {

                    musicButton.textContent = "♫";

                });
        }

    });

}


/* =====================================================
   MUSIC
===================================================== */

let musicPlaying = false;

if (musicButton) {

    musicButton.addEventListener("click", function () {

        if (!music) {
            return;
        }

        if (musicPlaying) {

            music.pause();

            musicPlaying = false;

            musicButton.textContent = "♫";

        } else {

            music.play()
                .then(function () {

                    musicPlaying = true;

                    musicButton.textContent = "❚❚";

                })
                .catch(function () {

                    console.log("Musik tidak dapat diputar.");

                });

        }

    });

}


/* =====================================================
   COUNTDOWN
===================================================== */

const weddingDate =
    new Date("2026-10-10T16:00:00+08:00").getTime();


function updateCountdown() {

    const now = new Date().getTime();

    const distance = weddingDate - now;


    if (distance <= 0) {

        setNumber("days", "00");
        setNumber("hours", "00");
        setNumber("minutes", "00");
        setNumber("seconds", "00");

        return;
    }


    const days =
        Math.floor(
            distance /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (distance %
                (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            (distance %
                (1000 * 60 * 60)) /
            (1000 * 60)
        );


    const seconds =
        Math.floor(
            (distance %
                (1000 * 60)) /
            1000
        );


    setNumber(
        "days",
        String(days).padStart(2, "0")
    );

    setNumber(
        "hours",
        String(hours).padStart(2, "0")
    );

    setNumber(
        "minutes",
        String(minutes).padStart(2, "0")
    );

    setNumber(
        "seconds",
        String(seconds).padStart(2, "0")
    );
}


function setNumber(id, value) {

    const element = document.getElementById(id);

    if (element) {
        element.textContent = value;
    }

}


updateCountdown();

setInterval(updateCountdown, 1000);


/* =====================================================
   SCROLL ANIMATION
===================================================== */

const sections =
    document.querySelectorAll(".section");


const observer =
    new IntersectionObserver(

        function(entries) {

            entries.forEach(function(entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                }

            });

        },

        {
            threshold: 0.15
        }

    );


sections.forEach(function(section) {

    observer.observe(section);

});