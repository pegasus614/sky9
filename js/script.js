// ---------- SCREEN 2 DOTS SCROLL ANIMATION (FIXED FOR CARD SWIPE) ----------
const screen2 = document.getElementById('screen2');
const dots = screen2?.querySelector('.dots');
const eventCards = screen2?.querySelectorAll('.event-card');
const eventsContainer = screen2?.querySelector('.events-container');

if (dots && eventCards && eventsContainer) {
  const dotElements = dots.children;

  // Initialize first dot active
  Array.from(dotElements).forEach((dot, idx) => {
    dot.classList.toggle('active', idx === 0);
  });

  // Listen to scroll/swipe on events container
  eventsContainer.addEventListener('scroll', () => {
    let closestIndex = 0;
    let minDistance = Infinity;

    eventCards.forEach((card, idx) => {
      const rect = card.getBoundingClientRect();
      const containerRect = eventsContainer.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const containerCenter = containerRect.left + containerRect.width / 2;
      const distance = Math.abs(cardCenter - containerCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    // Update dots
    Array.from(dotElements).forEach((dot, idx) => {
      dot.classList.toggle('active', idx === closestIndex);
    });
  });
}

// ---------- SCREENS ----------
const screen3 = document.getElementById('screen3');
const screen4 = document.getElementById('screen4');
const screen5 = document.getElementById('screen5');

// ---------- SCREEN 3 ----------
const selectedCount = screen3.querySelector('#selected-count');
const seats = screen3.querySelectorAll('.seat-card');

// ---------- SCREEN 4 ----------
function updateScreen4Count() {
  const selectedSeats = screen3.querySelectorAll('.seat-card.selected').length;
  const ticketDetails = screen4.querySelector('.ticket-details');
  const submitBtn = screen4.querySelector('.submit-btn');

  ticketDetails.innerHTML = `<br />${selectedSeats} Tickets Selected<br />`;
  submitBtn.textContent = `TRANSFER ${selectedSeats} TICKETS`;
}

// ---------- SEAT CLICK (SCREEN 3 ONLY) ----------
seats.forEach(seat => {
  seat.addEventListener('click', (e) => {
    e.stopPropagation();

    seat.classList.toggle('selected');

    const count = screen3.querySelectorAll('.seat-card.selected').length;
    selectedCount.textContent = `${count} Selected`;

    updateScreen4Count();
  });
});

// ---------- OPEN SCREEN 3 ----------
document.querySelectorAll('.transfer-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    screen2.classList.remove('active'); 
    screen3.classList.add('show');
  });
});

// ---------- SCREEN 3 → SCREEN 4 ----------
const transferLink = screen3.querySelector('.transfer-link');
transferLink.addEventListener('click', (e) => {
  e.preventDefault();
  screen3.classList.remove('show');
  screen4.classList.add('show');
  updateScreen4Count();
});

// ---------- SCREEN 4 → SCREEN 3 ----------
screen4.querySelector('.back-btn').addEventListener('click', (e) => {
  e.preventDefault();
  screen4.classList.remove('show');
  screen3.classList.add('show');
});

// ---------- OPEN SCREEN 5 ----------
document.querySelectorAll('.view-ticket').forEach(btn => {
  btn.addEventListener('click', () => {
    screen5.classList.add('show');
  });
});

// ---------- CLOSE BUTTONS ----------
screen3.querySelector('.fa-times')?.addEventListener('click', () => {
  screen3.classList.remove('show');
  screen2.classList.add('active'); 
});

screen5.querySelector('.fa-times')?.addEventListener('click', () => {
  screen5.classList.remove('show');
});

// ---------- SCREEN 4 KEYBOARD LIFT ---------

screen4.addEventListener("focusin", () => {
  screen4.classList.add("keyboard-open");
});

screen4.addEventListener("focusout", () => {
  screen4.classList.remove("keyboard-open");
});
