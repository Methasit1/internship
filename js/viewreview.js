import { fillCompanySidebar } from './reviewService.js';
document.addEventListener('DOMContentLoaded', () => {
    // -----------------------------------------------------------------
    // 1. บังคับขยับเส้นใต้ Indicator ไปที่ Profile (หน่วงเวลาแก้ main.js ทับ)
    // -----------------------------------------------------------------
    const updateNavIndicator = () => {
        const profileNav = document.getElementById('nav-profile');
        const feedNav = document.getElementById('nav-feed');
        const navIndicator = document.getElementById('nav-indicator');
        if (profileNav && navIndicator) {
            // สลับคลาสสีตัวอักษร
            if (feedNav) {
                feedNav.classList.remove('font-bold', 'text-gray-900');
                feedNav.classList.add('text-gray-500');
            }
            profileNav.classList.remove('text-gray-500');
            profileNav.classList.add('font-bold', 'text-gray-900');
            // คำนวณพิกัดตำแหน่งคำว่า Profile เทียบกับ Container เมนู
            const parent = profileNav.parentElement;
            if (parent) {
                const parentRect = parent.getBoundingClientRect();
                const profileRect = profileNav.getBoundingClientRect();
                navIndicator.style.left = `${profileRect.left - parentRect.left}px`;
                navIndicator.style.width = `${profileRect.width}px`;
            }
        }
    };
    // ใช้ setTimeout เพื่อให้ทำงานหลังจาก main.js และ CSS เรนเดอร์เสร็จแล้ว
    setTimeout(updateNavIndicator, 100);
    window.addEventListener('resize', updateNavIndicator);
    // -----------------------------------------------------------------
    // 2. ดึงข้อมูลรีวิวมาแสดงผล
    // -----------------------------------------------------------------
    const urlParams = new URLSearchParams(window.location.search);
    const reviewId = urlParams.get('id');
    const positionInput = document.getElementById('view-position');
    const reviewTextarea = document.getElementById('view-review');
    const ratingDisplay = document.getElementById('rating-display');
    const starIcons = document.querySelectorAll('.star-icon');
    const dateEl = document.getElementById('view-date');
    const rawReviews = localStorage.getItem('user_reviews');
    const reviews = rawReviews ? JSON.parse(rawReviews) : [];
    const data = reviews.find((r) => String(r.id) === String(reviewId));
    if (data) {
        if (data.companyId) {
            fillCompanySidebar(String(data.companyId));
        }
        if (dateEl) {
            dateEl.textContent = data.date || '31 / 08 / 2026';
        }
        if (positionInput) {
            positionInput.value = data.position || '';
        }
        if (reviewTextarea) {
            reviewTextarea.value = data.detail || data.content || data.reviewText || '';
        }
        const rating = typeof data.rating === 'number'
            ? data.rating
            : parseInt(String(data.rating || '5'), 10);
        if (ratingDisplay) {
            ratingDisplay.textContent = rating.toString();
        }
        starIcons.forEach((star, index) => {
            if (index < rating) {
                star.classList.remove('text-gray-300');
                star.classList.add('text-[#10B981]');
            }
            else {
                star.classList.remove('text-[#10B981]');
                star.classList.add('text-gray-300');
            }
        });
    }
});
//# sourceMappingURL=viewreview.js.map