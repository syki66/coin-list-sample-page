import React from 'react';
import { Link } from 'react-router-dom';

export default function GNB() {
  return (
    <>
      <Link to="/">가상자산 시세 목록</Link>
      <Link to="/bookmark">북마크 목록</Link>
    </>
  );
}
