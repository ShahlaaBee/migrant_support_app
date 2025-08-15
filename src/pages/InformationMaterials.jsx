import React from 'react'

const rightsMaterials = [
  {
    title: "Right to Safety",
    summary: "You have the right to be protected from harm and danger.",
    link: "https://www.un.org/en/universal-declaration-human-rights/"
  },
  {
    title: "Right to Privacy",
    summary: "Your personal information should be kept private and secure.",
    link: "https://www.ohchr.org/en/human-rights/right-privacy"
  },
  {
    title: "Right to Legal Assistance",
    summary: "You are entitled to seek legal help if needed.",
    link: "https://www.legalassistance.org/"
  }
]

const KnowYourRights = () => (
  <div>
    <h2>Know Your Rights</h2>
    <ul>
      {rightsMaterials.map((item, idx) => (
        <li key={idx}>
          <strong>{item.title}</strong>
          <p>{item.summary}</p>
          <a href={item.link} target="_blank" rel="noopener noreferrer">Learn more</a>
          <hr />
        </li>
      ))}
    </ul>
  </div>
)

export default KnowYourRights
