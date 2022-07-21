const files = [
  {
    name: 'calendar.css',
    import: true,
    content: `.calendar-todo-list {
  text-align: left;
  padding: 0;
  list-style: none;
}

.calendar-todo-list li {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.calendar-todo-item-badge {
  vertical-align: top;
  margin-top: 8px;
  width: 6px;
  height: 6px;
}  
`
  }
];

export default files;
