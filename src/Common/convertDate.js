import moment from "moment"

const dateConverter = (date) => {
  return moment(date).format("MMMM d, YYYY HH:mm:ss");
}

export default dateConverter;