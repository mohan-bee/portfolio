import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import { FireExtinguisher, Flame } from 'lucide-react';

// --- Utility: Calculate streak ---
const calculateStreak = (submissionCalendar) => {
  if (!submissionCalendar || Object.keys(submissionCalendar).length === 0) return 0;

  const sortedDates = Object.keys(submissionCalendar)
    .map(timestamp => ({
      timestamp: parseInt(timestamp),
      count: submissionCalendar[timestamp],
      date: new Date(parseInt(timestamp) * 1000),
    }))
    .sort((a, b) => b.timestamp - a.timestamp);

  const currentDate = new Date();
  const currentDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  const validDates = sortedDates.filter(item => item.date <= currentDay);

  let streak = 0;

  for (let i = 0; i < validDates.length; i++) {
    const checkDate = new Date(currentDay);
    checkDate.setDate(currentDay.getDate() - i);

    const submissionDate = validDates[i].date;
    const checkDateStr = checkDate.toISOString().split('T')[0];
    const submissionDateStr = submissionDate.toISOString().split('T')[0];

    if (checkDateStr === submissionDateStr && validDates[i].count > 0) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
};

// --- Styled Components ---
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 2rem;
`;

const StatsRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 100%;

  @media(min-width: 768px) {
    flex-direction: row;
  }

  img {
    max-width: 100%;
  }
`;

const wave = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const WaterFireText = styled.div`
font-family: sans-serif;
  font-size: 64px;
  font-weight: 900;
  background: linear-gradient(
    120deg,
    #3b82f6,
    #60a5fa,
    #2563eb,
    #1e3a8a,
    #1e40af
  );
  background-size: 200% 200%;
  animation: ${wave} 3.5s ease-in-out infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 10px rgba(59, 130, 246, 0.6), 0 0 20px rgba(37, 99, 235, 0.4);
  display: inline-block;
`;

const StreakDisplay = styled.div`
font-family: sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  font-weight: 900;
  color: #facc15;

  span {
    margin-left: 12px;
    font-family: sans-serif;
    font-size: 20px;
    color: white;
    font-weight: 600;
  }
`;

const StreakBanner = styled.div`
  width: 100%;
  max-width: 368px;
  margin: 0 auto;
  background-color: #272727;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: white;
  font-family: sans-serif;
  margin-bottom: 12px;
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 64px;
  font-size: 20px;
  color: #d1d5db;
`;

const SubText = styled.div`
  margin-top: 12px;
  font-size: 14px;
  color: #d1d5db;
`;

// --- Main Component ---
export default function Github() {
  const [calendar, setCalendar] = useState({});
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndCalculateStreak = async () => {
      try {
        const res = await axios.get('https://leetcode-api-faisalshohag.vercel.app/AGuLerDXpz');
        const data = res.data.submissionCalendar;
        setCalendar(data);

        const currentStreak = calculateStreak(data);
        setStreak(currentStreak);
      } catch (error) {
        console.error('Error fetching calendar:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndCalculateStreak();
  }, []);

  return (
    <Container>
      <StatsRow>
        <img src="https://camo.githubusercontent.com/341158cb3a0ce2e6938c436692cbda8db09fc16ac88bb7c22ada2531461cb134/68747470733a2f2f6769746875622d726561646d652d73746174732e76657263656c2e6170702f6170693f757365726e616d653d6d6f68616e2d6265652673686f775f69636f6e733d74727565267468656d653d746f6b796f6e69676874" alt="GitHub Stats" />
        <img src="https://camo.githubusercontent.com/5efc04928af4c8c763c592fea39c1956ac02dc1560ffce9779cd978c6ecd2ec7/68747470733a2f2f6769746875622d726561646d652d73746174732e76657263656c2e6170702f6170692f746f702d6c616e67732f3f757365726e616d653d6d6f68616e2d626565266c61796f75743d636f6d70616374267468656d653d746f6b796f6e69676874" alt="Top Languages" />
        <img src="https://nirzak-streak-stats.vercel.app/?user=mohan-bee&theme=dark&hide_border=false" alt="GitHub Streak Stats" />
      </StatsRow>

      <StreakBanner>
        <Title>LeetCode Current Streak <Flame />  </Title>

        {loading ? (
          <Loading>Loading...</Loading>
        ) : (
          <StreakDisplay>
            <WaterFireText>{streak} </WaterFireText>
            <span>days</span>
          </StreakDisplay>
        )}

      </StreakBanner>
    </Container>
  );
}
