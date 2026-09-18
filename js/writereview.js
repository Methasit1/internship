document.addEventListener('DOMContentLoaded', () => {
    let currentRating = 0; // คะแนนจริงที่เลือกไว้ (0-5)
    // 1. ดึง Element จาก DOM
    const starContainer = document.getElementById('starContainer');
    const ratingValueText = document.getElementById('ratingValueText');
    const displayDate = document.getElementById('displayDate');
    const reviewForm = document.getElementById('reviewForm');
    const positionInput = document.getElementById('internshipPosition');
    const detailInput = document.getElementById('detailedReview');
    if (!starContainer || !reviewForm)
        return;
    // ดึงดาวทั้งหมดใน Container
    const stars = starContainer.querySelectorAll('i, .star-btn, .star-icon');
    // 2. แสดงวันที่ปัจจุบัน (รูปแบบ DD / MM / YYYY)
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const dateStr = `${day} / ${month} / ${year}`;
    if (displayDate) {
        displayDate.textContent = dateStr;
    }
    // 3. ฟังก์ชัน อัปเดตสีดาวและตัวเลขคะแนน
    const renderStars = (rating) => {
        if (ratingValueText) {
            ratingValueText.textContent = rating.toString();
        }
        stars.forEach((star, idx) => {
            const val = parseInt(star.getAttribute('data-value') || String(idx + 1), 10);
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
    // 4. ระบบเลือกดาว Interactive (Hover & Click)
    stars.forEach((star, idx) => {
        const val = parseInt(star.getAttribute('data-value') || String(idx + 1), 10);
        star.addEventListener('mouseenter', () => renderStars(val));
        star.addEventListener('click', () => {
            currentRating = (currentRating === val) ? 0 : val;
            renderStars(currentRating);
        });
    });
    starContainer.addEventListener('mouseleave', () => renderStars(currentRating));
    // 5. บันทึกข้อมูลเมื่อกด Submit ฟอร์ม
    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const position = positionInput?.value.trim() || '';
        const detail = detailInput?.value.trim() || '';
        if (currentRating === 0) {
            alert('กรุณาเลือกคะแนนดาวอย่างน้อย 1 ดาวก่อนบันทึกครับ');
            return;
        }
        // สร้าง Object ข้อมูลใหม่ตรงตาม Review Interface
        const newReview = {
            id: Date.now().toString(),
            companyId: 'get-on-technology',
            companyName: 'บริษัท เก็ตออน เทคโนโลยี จำกัด',
            position: position,
            rating: currentRating,
            detail: detail,
            content: detail,
            date: dateStr,
            authorName: 'นายแฮมมี่ มหัศจรรย์',
            isNew: true
        };
        // ดึงข้อมูลเดิมใน localStorage
        const rawData = localStorage.getItem('user_reviews');
        let existingReviews = [];
        if (rawData) {
            try {
                const parsed = JSON.parse(rawData);
                existingReviews = Array.isArray(parsed) ? parsed : [parsed];
            }
            catch {
                existingReviews = [];
            }
        }
        // เพิ่มการ์ดใหม่ไว้หน้าสุด และเซฟลง localStorage
        existingReviews.unshift(newReview);
        localStorage.setItem('user_reviews', JSON.stringify(existingReviews));
        // เด้งไปหน้าแสดงผลรีวิว
        window.location.href = './companyreview.html';
    });
});
export {};
//# sourceMappingURL=writereview.js.map