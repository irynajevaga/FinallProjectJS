import { eventsStore } from "./js/data.js";
import { createDomElement } from "./js/utils.js";
import { formatDate } from "./js/utils.js";

const allEventsDiv = document.querySelector(".events__all-events");
const eventTypeSelect = document.getElementById("event-type");
const eventDistanceSelect = document.getElementById("event-distance");
const eventCategorySelect = document.getElementById("event-category");

function createEvent(arr) {
  arr.forEach((eventElement) => {
    const link = createDomElement({ tag: "a", className: "events__link", href: "#" }); allEventsDiv.append(link);
    const eventImageContainer = createDomElement({ tag: "div", className: "events__container" }); link.append(eventImageContainer);
    const eventImage = createDomElement({ tag: "img", className: "events__image", src: eventElement.image }); eventImageContainer.append(eventImage);
    const eventsDescription = createDomElement({ tag: "div", className: "events__description" }); link.append(eventsDescription);
    const eventsDate = createDomElement({ tag: "p", className: "events__date", textValue: formatDate(eventElement.date) });
    const eventsHeader = createDomElement({ tag: "h3", className: "events__title", textValue: eventElement.title });
    const eventsCategory = createDomElement({ tag: "p", className: "events__category", textValue: eventElement.category }); eventsDescription.append(eventsDate, eventsHeader, eventsCategory);

    if (eventElement.type === "online") {
      const onlineEventImage = document.createElement('div');

      onlineEventImage.classList.add('overlay__online');

      onlineEventImage.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.66634 2.66699C1.92996 2.66699 1.33301 3.26395 1.33301 4.00033V12.0003C1.33301 12.7367 1.92996 13.3337 2.66634 13.3337H9.33301C10.0694 13.3337 10.6663 12.7367 10.6663 12.0003V10.1249C10.6663 10.0717 10.7257 10.0399 10.77 10.0694L13.6299 11.976C14.0729 12.2714 14.6663 11.9538 14.6663 11.4213V4.57934C14.6663 4.04687 14.0729 3.72928 13.6299 4.02464L10.77 5.93123C10.7257 5.96077 10.6663 5.92901 10.6663 5.87576V4.00033C10.6663 3.26395 10.0694 2.66699 9.33301 2.66699H2.66634Z" fill="#707070"/>
    </svg><p>Online Event</p>
  `;
      eventsDescription.append(onlineEventImage);
    }

    if (eventElement.attendees) {
      const eventsAtendees = createDomElement({
        tag: "p",
        className: "events__all-events-atendees",
        textValue: `${eventElement.attendees} attendees`,
      });
      eventsDescription.append(eventsAtendees);
    }
  });
}
function clearEvents() {
  while (allEventsDiv.firstChild) {
    allEventsDiv.removeChild(allEventsDiv.firstChild);
  }
}
function filterEvents(arr) {
  const selectedType = eventTypeSelect.value === "any" ? undefined : eventTypeSelect.value;
  const selectedDistance = eventDistanceSelect.value === "any" ? undefined : eventDistanceSelect.value;
  const selectedCategory = eventCategorySelect.value === "any" ? undefined : eventCategorySelect.value;
  let filteredArr = arr;
  if (selectedType) {
    filteredArr = filteredArr.filter((element) => element.type === selectedType);
  }
  if (selectedDistance) {
    filteredArr = filteredArr.filter((element) => String(element.distance) === selectedDistance);
  }
  if (selectedCategory) {
    filteredArr = filteredArr.filter((element) => element.category === selectedCategory);
  }
  clearEvents();
  createEvent(filteredArr);
}
eventTypeSelect.addEventListener("change", () => { filterEvents(eventsStore) });
eventDistanceSelect.addEventListener("change", () => { filterEvents(eventsStore) });
eventCategorySelect.addEventListener("change", () => { filterEvents(eventsStore) });
createEvent(eventsStore);



