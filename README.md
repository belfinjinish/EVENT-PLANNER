# Event Planner

A simple, responsive web application to create, view, and manage events. Built with vanilla HTML, CSS, and JavaScript.

## Features

- **Add Events** — Create events with name, date, time, location, category, and description
- **Category Tags** — Color-coded categories: Conference, Social, Workshop, Meeting, Birthday, College, Other
- **Responsive Design** — Works on desktop, tablet, and mobile
- **Clean UI** — Modern card-based layout with hover effects
- **Form Validation** — Required field validation with user-friendly messages
- **Edit & Delete** — UI ready for edit/delete functionality (buttons present, logic extensible)

## Project Structure

```
EVENT PLANNER/
├── index.html      # Main HTML structure
├── style.css       # Styling with CSS variables
├── script.js       # Application logic
└── README.md       # This file
```

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools or dependencies required

### Running Locally

1. Clone or download this repository
2. Open `index.html` in your browser

Or serve it with a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (npx)
npx serve

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## Usage

1. Click **+ Add Event** button to open the form
2. Fill in the event details:
   - **Event Name** (required)
   - **Date** (required)
   - **Time** (optional, defaults to 00:00)
   - **Location** (optional, defaults to "TBD")
   - **Category** (required)
   - **Description** (optional)
3. Click **Create Event** to add it to the list
4. New events appear at the top of the list

## Categories & Colors

| Category | Color |
|----------|-------|
| Conference | Purple (`#8b5cf6`) |
| Social | Amber (`#f59e0b`) |
| Workshop | Emerald (`#10b981`) |
| Meeting | Blue (`#3b82f6`) |
| Birthday | Pink (`#ec4899`) |
| College | Orange (`#f97316`) |
| Other | Gray (`#6b7280`) |

## Customization

### CSS Variables (Design Tokens)

Modify colors, spacing, and shadows in `style.css` under `:root`:

```css
:root {
    --color-primary: #4f46e5;
    --color-bg: #f0f2f5;
    --color-surface: #ffffff;
    /* ... more variables */
}
```

### Adding Categories

1. Add a new CSS variable for the category color
2. Add a `.category-<name>` class in `style.css`
3. Add the `<option>` in `index.html` select element
4. The card will automatically use the correct color

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Future Enhancements

- [ ] LocalStorage persistence
- [ ] Edit event functionality
- [ ] Delete event functionality
- [ ] Filter by category
- [ ] Sort by date
- [ ] Search events
- [ ] Export/Import events (JSON)

## License

MIT License — feel free to use and modify for your own projects.