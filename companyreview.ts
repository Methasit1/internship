import type { Review } from './models.js';
import { createCompanyManager, getCurrentUser } from './reviewService.js';

document.addEventListener('DOMContentLoaded', () => {

    // ดึงข้อมูลบริษัทจาก URL และแสดงผลฝั่งซ้าย
    const urlParams = new URLSearchParams(window.location.search);
    const companyId = urlParams.get('id');

    // หาข้อมูลบริษัทใน mockData
    const company = createCompanyManager().findById(companyId ?? '');
    if (company) {
        const companyImg = document.getElementById('company-img') as HTMLImageElement;
        const companyName = document.getElementById('company-name');

        if (companyImg) companyImg.src = company.imageUrl;
        if (companyName) companyName.textContent = company.name;
    }

    // แสดงรีวิว (ดึงมาจาก LocalStorage)
    const reviewListContainer = document.getElementById('reviewListContainer') || document.querySelector('aside.flex-1.overflow-y-auto');

    if (reviewListContainer) {
        const rawReviews = localStorage.getItem('user_reviews');
        let storedReviews: Review[] = rawReviews ? JSON.parse(rawReviews) : [];

        // กรองเอารีวิวเฉพาะของบริษัทนี้
        if (companyId) {
            storedReviews = storedReviews.filter(review => String(review.companyId) === String(companyId));
        }
        const internCountElement = document.getElementById('intern-count');
        const internCountReviewElement = document.getElementById('intern-count-review');
        if (internCountElement) {
            // ใช้ Set ช่วยนับชื่อคนเขียนรีวิวเพื่อไม่ให้นับคนเดียวกันซ้ำ
            // (แต่ถ้าอยากนับรวมทุกรีวิวเลย สามารถเปลี่ยนเป็น const count = storedReviews.length; ได้เลยครับ)
            const uniqueReviewers = new Set(storedReviews.map(r => r.authorName || 'ไม่ระบุชื่อ'));
            internCountElement.textContent = `ฝึกงานแล้ว ${uniqueReviewers.size} คน`;
        }
        if (internCountReviewElement) {
            const uniqueReviewers = new Set(storedReviews.map(r => r.authorName || 'ไม่ระบุชื่อ'));
            internCountReviewElement.textContent = `Based on ${uniqueReviewers.size} Reviews`;
        }

        const overallRatingElement = document.getElementById('overall-rating');
        const overallStarsElement = document.getElementById('overall-stars');
        if (overallRatingElement && overallStarsElement) {
            if (storedReviews.length === 0) {
                overallRatingElement.textContent = '0.0';
                overallStarsElement.innerHTML = '<i class="fa-solid fa-star text-gray-300"></i>'.repeat(5);
            } else {
                const totalRating = storedReviews.reduce((sum, review) => sum + (Number(review.rating) || 5), 0);
                const averageRating = (totalRating / storedReviews.length).toFixed(1);
                
                overallRatingElement.textContent = averageRating;

                let starsHTML = '';
                const avgNum = Math.round(Number(averageRating));
                for (let i = 1; i <= 5; i++) {
                    if (i <= avgNum) {
                        starsHTML += '<i class="fa-solid fa-star text-[#10B981]"></i>';
                    } else {
                        starsHTML += '<i class="fa-solid fa-star text-gray-300"></i>';
                    }
                }
                overallStarsElement.innerHTML = starsHTML;
            }
        }

        reviewListContainer.innerHTML = '';

        if (storedReviews.length === 0) {
            reviewListContainer.innerHTML = `
                <div class="flex items-center justify-center h-40 bg-white rounded-3xl border border-gray-100 text-gray-400 font-thai text-base shadow-sm">
                    ยังไม่มีรีวิวสำหรับบริษัทนี้
                </div>
            `;
        } else {
            // วนลูปสร้างการ์ดรีวิวทีละใบ
            storedReviews.forEach((review: Review) => {
                let starsHTML = '';
                const rating = Number(review.rating) || 5;
                for (let i = 1; i <= 5; i++) {
                    starsHTML += i <= rating
                        ? '<i class="fa-solid fa-star text-xs text-[#10B981]"></i>'
                        : '<i class="fa-solid fa-star text-xs text-gray-300"></i>';
                }

                const cardHTML = `
                    <div class="bg-white rounded-3xl w-full p-6 border border-gray-100 shadow-sm mb-4">
                        <div class="flex items-center justify-between mb-4">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 shrink-0">
                                    <i class="fa-regular fa-user text-base"></i>
                                </div>
                                <h4 class="font-medium tracking-wider text-lg text-gray-900 font-thai">${review.authorName || 'ไม่ระบุชื่อ'}</h4>
                            </div>
                            <div class="flex items-center gap-2">
                                <span class="text-xs font-semibold text-gray-400">${review.date}</span>
                            </div>
                        </div>
                        <div class="flex items-center gap-3 mb-4">
                            <span class="border border-[#10B981] text-[#10B981] text-xs font-semibold px-3 py-1 rounded-full">
                                ${review.position || 'ฝึกงาน'}
                            </span>
                            <div class="bg-[#EEF2FF] px-3 py-1 rounded-full flex items-center gap-1.5">
                                <div class="flex gap-0.5 text-[#10B981]">
                                    ${starsHTML}
                                </div>
                                <span class="text-xs font-bold text-gray-900 ml-1">${rating}</span>
                            </div>
                        </div>
                        <p class="text-sm text-gray-700 font-eng leading-relaxed">
                            ${review.detail || review.content || 'ไม่มีรายละเอียด'}
                        </p>
                    </div>
                `;
                reviewListContainer.insertAdjacentHTML('beforeend', cardHTML);
            });
        }
    }

    // ดักจับเฉพาะปุ่ม เขียนรีวิว
    const user = getCurrentUser();
    const btnWriteReview = document.getElementById('btn-write-review') as HTMLAnchorElement;

    if (btnWriteReview) {
        btnWriteReview.addEventListener('click', (e) => {
            if (!user.canWriteReview()) {
                e.preventDefault();
                window.location.href = './login.html';
            } else if (company) {
                e.preventDefault();
                window.location.href = `./writereview.html?id=${company.id}`;
            }
        });
    }
});