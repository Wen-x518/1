import React from 'react';

export interface Post {
  id: string;
  subreddit: string;
  subredditIcon: string;
  author: string;
  timeAgo: string;
  title: string;
  content?: string;
  image?: string;
  upvotes: number;
  comments: number;
  isJoined: boolean;
}

export interface Community {
  id: string;
  name: string;
  members: string;
  icon: string;
  desc?: string;
}

export interface SidebarItem {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  href?: string;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  upvotes: number;
  timeAgo: string;
}

export interface OpcApp {
  id: string;
  name: string;
  type: 'official' | 'community';
  url: string;
  desc: string;
  author?: string;
  stars?: number;
}