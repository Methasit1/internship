import { rawMockCompanies } from './mockData.js';
import { CompanyManager } from './models.js';

document.addEventListener('DOMContentLoaded', () => {
    const manager = new CompanyManager();

    // ดึงข้อมูลบริษัท
    manager.loadMockData(rawMockCompanies);

    // ==========================================
    // ฟังก์ชันสร้างการ์ด (คลิกเปลี่ยนหน้า companyreview.html)
    // ==========================================
    const createCard = (c: any) => `
    <div onclick="window.location.href='./companyreview.html'" class="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden group hover:shadow-lg/20 transition flex flex-col relative pb-4 flex-1 cursor-pointer select-none">
      
        <div class="relative h-30 overflow-hidden">
            <img src="${c.imageUrl}" alt="${c.name}" class="w-full h-full object-cover transition duration-300 group-hover:scale-105"/>
        </div>

        <div class="p-4 flex flex-col flex-grow">
            <h3 class="font-bold text-lg mb-2 line-clamp-1 group-hover:text-emerald-600 transition-colors">${c.name}</h3>
        
            <!-- Badge -->
            <div class="flex flex-wrap items-center gap-2 mb-6">
                <span class="bg-[#10B981] text-white text-[10px] px-3.5 pt-[6px] pb-[5px] rounded-full flex items-center justify-center font-semibold leading-none">ฝึกงาน</span>
                <span class="bg-[#E5EEFF] text-[10px] px-2 pt-[2px] pb-[3px] rounded-full flex items-center gap-1 justify-center font-semibold text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="#10B981">
                        <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.399 8.168-7.333-3.856-7.333 3.856 1.399-8.168-5.934-5.787 8.2-1.192z"/>
                    </svg> ${c.rating.toFixed(1)}
                </span>
            </div>

            <div class="space-y-1.5 text-xs text-[#B3B3B3] flex-grow pr-12">
                <p class="flex items-start gap-1.5">
                    <svg class="w-4 h-4 shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#B3B3B3" fill-opacity="0.8">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5 2.5-2.5z"/>
                    </svg>
                    <span class="line-clamp-2 min-w-0">${c.address || 'ไม่มีข้อมูล'}</span>
                </p>
                
                <p class="flex items-start gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 -960 960 960" width="20px" fill="#B3B3B3">
                        <path d="M362-540q-48-48-48-118t48-118q48-48 118-48t118 48q48 48 48 118t-48 118q-48 48-118 48t-118-48ZM162-131v-127q0-30 14.5-55t40.5-41q59-35 126.29-53.5t136.5-18.5q69.21 0 136.71 18.5Q684-389 743-354q26 15 40.5 40.5T798-258v127H162Zm98-98h440v-29q0-5.18-1.03-7.41-1.02-2.24-2.97-2.59-47-28-103.5-44T480-328q-56 0-112.5 15.5T264-268q-2 1-3 3.22-1 2.23-1 6.78v29Zm268.5-380.71q19.5-19.71 19.5-48.5t-19.71-48.29q-19.71-19.5-48.5-19.5t-48.29 19.71q-19.5 19.71-19.5 48.5t19.71 48.29q19.71 19.5 48.5 19.5t48.29-19.71ZM480-658Zm0 429Z"/>
                    </svg>
                    <span class="line-clamp-2">ฝึกงานแล้ว ${c.internCount} คน</span>
                </p>
            
            </div>
        </div>

        <!-- มีรีวิวใหม่ -->
        <div class="absolute bottom-4 right-6">
           <span class="text-emerald-500 text-xs font-bold">มีรีวิวใหม่</span>
        </div>

    </div>
    `;

    // 1. Slider (company-grid)
    const sliderContainer = document.getElementById('company-grid') as HTMLElement;
    if (sliderContainer) {
        const btnPrev = document.getElementById('btn-prev') as HTMLButtonElement;
        const btnNext = document.getElementById('btn-next') as HTMLButtonElement;
        const companies = manager.getAllCompanies().slice(0, 10);
        let htmlContent = '';

        for (let i = 0; i < companies.length; i += 2) {
            const comp1 = companies[i];
            const comp2 = companies[i + 1];

            if (!comp1) continue;

            const c1 = comp1.getCompanyInfo();
            const c2 = comp2 ? comp2.getCompanyInfo() : null;

            htmlContent += `
        <div class="slider-col flex-shrink-0 flex flex-col gap-6" style="width: calc(33.3333% - 1rem);">
          ${createCard(c1)}
          ${c2 ? createCard(c2) : ''}
        </div>
      `;
        }
        sliderContainer.innerHTML = htmlContent;

        let isAnimating = false;
        btnNext?.addEventListener('click', () => {
            if (isAnimating || sliderContainer.children.length === 0) return;
            isAnimating = true;
            const firstChild = sliderContainer.children[0] as HTMLElement;
            const colWidth = firstChild.offsetWidth;
            sliderContainer.style.transition = 'transform 0.4s ease-in-out';
            sliderContainer.style.transform = `translateX(-${colWidth + 24}px)`;
            setTimeout(() => {
                sliderContainer.appendChild(firstChild);
                sliderContainer.style.transition = 'none';
                sliderContainer.style.transform = 'translateX(0)';
                isAnimating = false;
            }, 400);
        });

        btnPrev?.addEventListener('click', () => {
            if (isAnimating || sliderContainer.children.length === 0) return;
            isAnimating = true;
            const lastChild = sliderContainer.children[sliderContainer.children.length - 1] as HTMLElement;
            const firstChild = sliderContainer.children[0] as HTMLElement;
            const colWidth = firstChild.offsetWidth;
            sliderContainer.prepend(lastChild);
            sliderContainer.style.transition = 'none';
            sliderContainer.style.transform = `translateX(-${colWidth + 24}px)`;
            const _reflow = sliderContainer.offsetWidth;
            sliderContainer.style.transition = 'transform 0.4s ease-in-out';
            sliderContainer.style.transform = 'translateX(0)';
            setTimeout(() => { isAnimating = false; }, 400);
        });
    }

    // 2. All Companies Grid (all-companies-grid)
    const allCompaniesGrid = document.getElementById('all-companies-grid') as HTMLElement;
    if (allCompaniesGrid) {
        let gridHtml = '';
        const allCompaniesList = manager.getAllCompanies();

        allCompaniesList.forEach(companyObj => {
            const c = companyObj.getCompanyInfo();
            gridHtml += createCard(c);
        });

        allCompaniesGrid.innerHTML = gridHtml;
    }

    // 3. Navbar & Auth State
    const navMenu = document.getElementById('nav-menu') as HTMLElement;
    const navItems = document.querySelectorAll('.nav-item');
    const navIndicator = document.getElementById('nav-indicator') as HTMLElement;
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (navMenu && navItems.length > 0 && navIndicator) {
        const moveIndicator = (el: HTMLElement) => {
            const menuRect = navMenu.getBoundingClientRect();
            const elRect = el.getBoundingClientRect();
            const leftOffset = elRect.left - menuRect.left;

            navIndicator.style.transform = `translateX(${leftOffset}px)`;
            navIndicator.style.width = `${elRect.width}px`;

            navItems.forEach(item => {
                item.classList.remove('text-emerald-600');
                item.classList.add('text-gray-600');
            });
            el.classList.remove('text-gray-600');
            el.classList.add('text-emerald-600');
        };

        setTimeout(() => {
            const currentPath = window.location.pathname;
            if (currentPath.includes('profile.html') && isLoggedIn) {
                moveIndicator(navItems[1] as HTMLElement);
            } else {
                moveIndicator(navItems[0] as HTMLElement);
            }
        }, 100);

        const profileLink = navItems[1] as HTMLAnchorElement;
        if (profileLink) {
            profileLink.addEventListener('click', (e) => {
                if (!isLoggedIn) {
                    e.preventDefault();
                    window.location.href = './login.html';
                }
            });
        }
    }

    const checkAuthState = () => {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const btnLogin = document.getElementById('btn-login');
        const btnProfile = document.getElementById('btn-profile');
        const btnLogout = document.getElementById('btn-logout');
        const registerPromo = document.getElementById('register-promo');

        if (isLoggedIn) {
            btnLogin?.classList.replace('block', 'hidden');
            btnProfile?.classList.replace('hidden', 'flex');
            btnLogout?.classList.remove('hidden');
            registerPromo?.classList.add('hidden');
        } else {
            btnLogin?.classList.replace('hidden', 'block');
            btnProfile?.classList.replace('flex', 'hidden');
            btnLogout?.classList.add('hidden');
            registerPromo?.classList.remove('hidden');
        }
    };

    checkAuthState();

    const btnLogout = document.getElementById('btn-logout');
    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userData');
            window.location.reload();
        });
    }
});