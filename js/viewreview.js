document.addEventListener('DOMContentLoaded', () => {
    // 1. ดึง ID จาก URL (?id=...)
    const urlParams = new URLSearchParams(window.location.search);
    const reviewId = urlParams.get('id');
    // 2. ดึง Element จาก DOM
    const positionInput = document.getElementById('view-position');
    const reviewTextarea = document.getElementById('view-review');
    const ratingDisplay = document.getElementById('rating-display');
    const starIcons = document.querySelectorAll('.star-icon');
    // 3. ดึงรายการรีวิวทั้งหมดจาก localStorage
    const rawReviews = localStorage.getItem('user_reviews');
    const reviews = rawReviews ? JSON.parse(rawReviews) : [];
    // 4. ค้นหารีวิวตาม ID
    const data = reviews.find((r) => String(r.id) === String(reviewId));
    // 5. นำข้อมูลมาแสดงผล
    if (data) {
        if (positionInput)
            positionInput.value = data.position || '';
        if (reviewTextarea)
            reviewTextarea.value = data.detail || data.content || '';
        const rating = typeof data.rating === 'number'
            ? data.rating
            : parseInt(String(data.rating || '5'), 10);
        if (ratingDisplay)
            ratingDisplay.textContent = rating.toString();
        // ระบายสีดาวตามคะแนน
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
export {};
//# sourceMappingURL=viewreview.js.map