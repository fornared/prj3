import React, { useState } from "react";

// 각 이벤트의 세부 정보를 가지고 있는 가짜 데이터
const events = [
  {
    id: 1,
    title: "이벤트 제목 1",
    description: "이벤트 내용 1",
  },
  {
    id: 2,
    title: "이벤트 제목 2",
    description: "이벤트 내용 2",
  },
  // 필요한 만큼 다른 이벤트 데이터를 추가하세요
];

function Event() {
  // 선택된 이벤트의 상태를 관리합니다.
  const [selectedEvent, setSelectedEvent] = useState(null);

  // 이벤트를 클릭할 때 호출되는 함수
  const handleEventClick = (eventId) => {
    const event = events.find((e) => e.id === eventId);
    setSelectedEvent(event);
  };

  return (
    <div>
      <h1>이벤트</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <button onClick={() => handleEventClick(event.id)}>
              {event.title}
            </button>
          </li>
        ))}
      </ul>

      {/* 선택된 이벤트가 있을 경우에만 세부 정보를 표시합니다. */}
      {selectedEvent && (
        <div>
          <h2>{selectedEvent.title}</h2>
          <p>{selectedEvent.description}</p>
          <button onClick={() => setSelectedEvent(null)}>뒤로가기</button>
        </div>
      )}
    </div>
  );
}

export default Event;
