export interface ShowInfo {
  show: ShowDetails
}

function ShowInfo({ show }: ShowInfo) {
  return (
    <div className="general-info">
      <div>
        <b>Network: </b> {show?.network?.name} (
        {new Date(show?.premiered).getFullYear()}{" "}
        {show?.ended && `- ${new Date(show?.ended).getFullYear()}`})
      </div>
      <div>
        <b>Schedule: </b>
        {show?.schedule.days.map((day) => day.slice(0, 3)).join(", ")}{" "}
        {show?.schedule.time}
      </div>
      <div>
        <b>Status: </b> {show?.status}
      </div>
      <div>
        <b>Show type: </b> {show?.type}
      </div>
      <div>
        <b>Genres: </b>
        {show?.genres.map((genre) => genre).join(" | ")}
      </div>
      <div>
        <b>Rating: </b>
        {show?.rating.average}
      </div>
    </div>
  )
}

export default ShowInfo
