export const generatelovepercent=() => {
  return `${~~(Math.random()*100)}%`;
}

// const generatelovepercent=() => {
//   return `${~~(Math.random()*100)}%`;
// }

// export default generatelovepercent;

const a = {
  average: (a, b) => {
    console.log((a + b) / 2);
  },
  percent: (a, b) => {
    console.log((a / b) * 100);
  }
};

export default a;