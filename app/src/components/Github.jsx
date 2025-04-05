import React from 'react'
import styled from 'styled-components'

const Github = () => {
  return (
    <Container>
        <img src="https://camo.githubusercontent.com/341158cb3a0ce2e6938c436692cbda8db09fc16ac88bb7c22ada2531461cb134/68747470733a2f2f6769746875622d726561646d652d73746174732e76657263656c2e6170702f6170693f757365726e616d653d6d6f68616e2d6265652673686f775f69636f6e733d74727565267468656d653d746f6b796f6e69676874" alt="" />
        <img src="https://camo.githubusercontent.com/5efc04928af4c8c763c592fea39c1956ac02dc1560ffce9779cd978c6ecd2ec7/68747470733a2f2f6769746875622d726561646d652d73746174732e76657263656c2e6170702f6170692f746f702d6c616e67732f3f757365726e616d653d6d6f68616e2d626565266c61796f75743d636f6d70616374267468656d653d746f6b796f6e69676874" alt="" />
        <img src="https://nirzak-streak-stats.vercel.app/?user=mohan-bee&theme=dark&hide_border=false" alt="" />
    </Container>
  )
}

export default Github

const Container = styled.div`
    display: flex;
    justify-content: space-evenly;
    @media screen and (max-width: 768px) {
      flex-direction: column;
      margin-top: 100px;
      padding: 0 10px;
    }

`