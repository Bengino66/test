/**
 * 1. GLOBAL FUNCTIONS 
 * (Outside DOMContentLoaded so HTML 'onclick' can find them)
 */

function selectCategory(element) {
    const allCards = document.querySelectorAll('.category-card');
    if (element.classList.contains('coming-soon-option')) {
        const type = element.innerText.trim();
        alert(`${type} service is coming soon! Please select 'Driving' to proceed.`);
        return; 
    }
    allCards.forEach(card => card.classList.remove('active'));
    element.classList.add('active');
}

function triggerUpload(id) {
    const input = document.getElementById(id);
    if (!input) return;
    input.click();
    input.onchange = function() {
        if (this.files && this.files[0]) {
            const zone = this.parentElement;
            zone.innerHTML = `<i class='bx bx-check' style='color: #28a745; font-size: 40px;'></i>`;
        }
    };
}

/**
 * 2. PAGE INITIALIZATION
 */
document.addEventListener('DOMContentLoaded', () => {
    
    // --- PASSWORD TOGGLE LOGIC ---
    const toggleIcons = document.querySelectorAll('.toggle-password');

    toggleIcons.forEach(icon => {
        icon.style.cursor = 'pointer'; // Ensure it looks clickable
        icon.addEventListener('click', function() {
            // This looks for the input specifically within the wrapper
            const passwordInput = this.closest('.input-wrapper').querySelector('input');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                this.classList.replace('bx-hide', 'bx-show');
            } else {
                passwordInput.type = 'password';
                this.classList.replace('bx-show', 'bx-hide');
            }
        });
    });

    // --- MOBILE MENU LOGIC ---
    const menuBtn = document.querySelector('.bx-menu'); 
    const closeBtn = document.getElementById('closeMenu');
    const menuOverlay = document.getElementById('menuOverlay');

    if (menuBtn && closeBtn && menuOverlay) {
        menuBtn.addEventListener('click', () => menuOverlay.classList.add('active'));
        closeBtn.addEventListener('click', () => menuOverlay.classList.remove('active'));
    }

    // --- SIGNUP TAB SWITCHER ---
    const driverTab = document.getElementById('driverTab');
    const passengerTab = document.getElementById('passengerTab');
    const signupForm = document.getElementById('signupForm');

    if (driverTab && passengerTab) {
        const signupTitle = document.getElementById('signupTitle');
        const driverFields = document.getElementById('driverFields');
        const passengerFields = document.getElementById('passengerFields');

        driverTab.addEventListener('click', () => {
            driverTab.classList.add('active');
            passengerTab.classList.remove('active');
            signupTitle.innerText = "Driver SignUp";
            if(driverFields) driverFields.style.display = "block";
            if(passengerFields) passengerFields.style.display = "none";
        });

        passengerTab.addEventListener('click', () => {
            passengerTab.classList.add('active');
            driverTab.classList.remove('active');
            signupTitle.innerText = "Passenger SignUp";
            if(passengerFields) passengerFields.style.display = "block";
            if(driverFields) driverFields.style.display = "none";
        });
    }

    // --- NAVIGATION & FORM LOGIC ---
    const kycForm = document.querySelector('.kyc-form');
    const kyc2NextBtn = document.getElementById('kyc2Next');
    const kycForm3 = document.getElementById('kycForm3');

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            const isDriver = driverTab.classList.contains('active');
            window.location.href = isDriver ? 'driver-kyc-1.html' : 'index.html';
        });
    }

    if (kycForm && !kyc2NextBtn && !kycForm3) { 
        kycForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const activeCard = document.querySelector('.category-card.active');
            if (activeCard && !activeCard.classList.contains('coming-soon-option')) {
                window.location.href = 'driver-kyc-2.html';
            } else {
                alert("Please select the 'Driving' category to continue.");
            }
        });
    }

    if (kyc2NextBtn) {
        kyc2NextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'driver-kyc-3.html';
        });
    }

    if (kycForm3) {
        kycForm3.addEventListener('submit', (e) => {
            e.preventDefault();
            alert("Registration Complete! Your documents are being reviewed.");
            window.location.href = 'index.html';
        });
    }
});
