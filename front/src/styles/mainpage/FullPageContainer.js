import styled from 'styled-components';

const FullpageContainer= styled.div`
.container{
  scroll-behavior: smooth;
  width: 100%;
  height: 100vh;
  scroll-snap-type: y mandatory;
  scroll-padding-top: 10px;
  overflow-y: scroll;
}
.container::-webkit-scrollbar {width:0; background: transparent;}
.container > div {
  scroll-snap-align: start;
}`

export default FullpageContainer;