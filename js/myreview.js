document.addEventListener('DOMContentLoaded', () => {
    // 1. ดึง ID จาก URL (?id=...)
    const urlParams = new URLSearchParams(window.location.search);
    const reviewId = urlParams.get('id');
    // 2. ดึง Element จาก DOM
    const editForm = document.getElementById('edit-review-form');
    const positionInput = document.getElementById('input-position');
    const reviewInput = document.getElementById('input-review');
    const starContainer = document.getElementById('star-container');
    const ratingDisplay = document.getElementById('rating-display');
    if (!editForm || !positionInput || !reviewInput || !starContainer || !ratingDisplay)
        return;
    const stars = starContainer.querySelectorAll('.star-btn');
    // 3. ดึงรายการรีวิวทั้งหมดจาก localStorage
    const rawReviews = localStorage.getItem('user_reviews');
    let reviews = rawReviews ? JSON.parse(rawReviews) : [];
    // 4. ค้นหารีวิวที่ต้องการแก้ไข
    const targetIndex = reviews.findIndex((r) => String(r.id) === String(reviewId));
    const currentReview = targetIndex !== -1 ? reviews[targetIndex] : null;
    let currentRating = 5;
    // ฟังก์ชันอัปเดตสีดาวและตัวเลขคะแนน
    const renderStars = (rating) => {
        ratingDisplay.textContent = rating.toString();
        stars.forEach((star) => {
            const val = parseInt(star.getAttribute('data-value') || '0', 10);
            if (val <= rating) {
                star.classList.remove('text-gray-300');
                star.classList.add('text-[#10B981]');
            }
            else {
                star.classList.remove('text-[#10B981]');
                star.classList.add('text-gray-300');
            }
        });
    };
    // 5. แสดงข้อมูลเดิมลงใน Form
    if (currentReview) {
        positionInput.value = currentReview.position || '';
        reviewInput.value = currentReview.detail || '';
        currentRating = currentReview.rating || 5;
    }
    renderStars(currentRating);
    // 6. ระบบดาว Interactive (Hover & Click)
    stars.forEach((star) => {
        const val = parseInt(star.getAttribute('data-value') || '0', 10);
        star.addEventListener('mouseenter', () => renderStars(val));
        star.addEventListener('click', () => {
            currentRating = val;
            renderStars(currentRating);
        });
    });
    starContainer.addEventListener('mouseleave', () => renderStars(currentRating));
    // 7. บันทึกการแก้ไข
    editForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (currentRating === 0) {
            alert('กรุณาเลือกคะแนนดาวอย่างน้อย 1 ดาวก่อนบันทึกครับ');
            return;
        }
        if (targetIndex !== -1 && reviews[targetIndex]) {
            const existingReview = reviews[targetIndex];
            // สร้าง Object ใหม่ที่ตรงตามโครงสร้าง Review interface
            const updatedReview = {
                ...existingReview,
                position: positionInput.value.trim(),
                rating: currentRating,
                detail: reviewInput.value.trim()
            };
            reviews[targetIndex] = updatedReview;
            localStorage.setItem('user_reviews', JSON.stringify(reviews));
        }
        window.location.href = './profile.html';
    });
});
export {};
//# sourceMappingURL=myreview.js.map