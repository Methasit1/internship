document.addEventListener('DOMContentLoaded', () => {
    // ดึงส่วนแสดงผลการ์ดรีวิว
    const reviewListContainer = document.getElementById('reviewListContainer') || document.querySelector('aside.flex-1.overflow-y-auto');
    if (!reviewListContainer)
        return;
    const storedReviews = JSON.parse(localStorage.getItem('user_reviews') || '[]');
    // วนลูปสร้างการ์ดรีวิวเพิ่มลงในหน้า
    storedReviews.forEach((review) => {
        let starsHTML = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= review.rating) {
                starsHTML += '<i class="fa-solid fa-star text-xs"></i>';
            }
            else {
                starsHTML += '<i class="fa-solid fa-star text-xs text-gray-300"></i>';
            }
        }
        const cardHTML = `
            <div class="bg-white rounded-3xl w-full p-6 border border-gray-100 shadow-sm">
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 shrink-0">
                            <i class="fa-regular fa-user text-base"></i>
                        </div>
                        <h4 class="font-medium tracking-wider text-lg text-gray-900 font-thai">${review.authorName}</h4>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="text-xs font-semibold text-gray-400">${review.date}</span>
                        ${review.isNew ? '<span class="inline-block text-[#10B981] font-semibold text-xs">รีวิวใหม่</span>' : ''}
                    </div>
                </div>
                <div class="flex items-center gap-3 mb-4">
                    <span class="border border-[#10B981] text-[#10B981] text-xs font-semibold px-3 py-1 rounded-full">
                        ${review.position}
                    </span>
                    <div class="bg-[#EEF2FF] px-3 py-1 rounded-full flex items-center gap-1.5">
                        <div class="flex gap-0.5 text-[#10B981]">
                            ${starsHTML}
                        </div>
                        <span class="text-xs font-bold text-gray-900 ml-1">${review.rating}</span>
                    </div>
                </div>
                <p class="text-sm text-gray-700 font-eng leading-relaxed">
                    ${review.detail}
                </p>
            </div>
        `;
        reviewListContainer.insertAdjacentHTML('afterbegin', cardHTML);
    });
});
export {};
//# sourceMappingURL=companyreview.js.map