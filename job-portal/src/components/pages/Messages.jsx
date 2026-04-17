import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, Grid, Paper, Avatar, Badge, TextField, IconButton, 
  Typography, InputAdornment, List, ListItem, ListItemAvatar, ListItemText 
} from '@mui/material';
import { FiSend, FiPaperclip, FiSmile, FiSearch, FiMoreVertical, FiPhone, FiVideo, FiInfo, FiChevronLeft, FiCheck, FiCheckCircle } from 'react-icons/fi';
import { IoCheckmarkDoneOutline, IoCheckmarkOutline } from 'react-icons/io5';
import { mockChats as initialChats } from '../../data/messages';
import { useNavigate } from 'react-router-dom';
import Navbar from '../layout/Navbar';

const Messages = () => {
  const navigate = useNavigate();
  const [chats, setChats] = useState(initialChats);
  const [activeChatId, setActiveChatId] = useState(null); // Keep null initially for mobile view check
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Set initial active chat on desktop
  useEffect(() => {
    if (window.innerWidth >= 900 && !activeChatId && chats.length > 0) {
      setActiveChatId(chats[0].id);
    }
  }, [chats, activeChatId]);

  const activeChat = chats.find(c => c.id === activeChatId) || null;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChat?.messages, isTyping]);

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!messageText.trim()) return;

    const newMessage = {
      id: Date.now(),
      senderId: 'me',
      text: messageText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };

    setChats(prevChats => prevChats.map(chat => {
      if (chat.id === activeChatId) {
        return {
          ...chat,
          lastMessage: messageText,
          lastTime: "Just now",
          messages: [...chat.messages, newMessage]
        };
      }
      return chat;
    }));

    setMessageText('');
    
    // Sort logic to move chat to top
    setChats(prevChats => {
      const active = prevChats.find(c => c.id === activeChatId);
      const others = prevChats.filter(c => c.id !== activeChatId);
      return [active, ...others];
    });

    // Mock incoming typing and 'Seen' status for realism
    setTimeout(() => {
      setChats(prev => prev.map(c => {
        if (c.id === activeChatId) {
          const msgs = [...c.messages];
          msgs[msgs.length - 1].status = 'seen';
          return { ...c, messages: msgs };
        }
        return c;
      }));
      setIsTyping(true);
      
      setTimeout(() => {
        setIsTyping(false);
        const replyMessage = {
          id: Date.now() + 1,
          senderId: activeChatId,
          text: "Thanks! I have received your message. I'll get back to you soon.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setChats(prev => prev.map(c => {
          if (c.id === activeChatId) {
            return {
              ...c,
              lastMessage: replyMessage.text,
              lastTime: "Just now",
              messages: [...c.messages, replyMessage]
            };
          }
          return c;
        }));
      }, 2500);
    }, 1000);
  };

  const handleSelectChat = (id) => {
    setActiveChatId(id);
    setChats(prevChats => prevChats.map(chat => {
      if (chat.id === id && chat.unread > 0) {
        return { ...chat, unread: 0 };
      }
      return chat;
    }));
  };

  const filteredChats = chats.filter(chat => 
    chat.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <Box sx={{ flexGrow: 1, height: 'calc(100vh - 88px)', mt: '88px', backgroundColor: '#f8fafc', overflow: 'hidden' }}>
        <Grid container sx={{ height: '100%' }}>
        
        {/* 1. LEFT SIDEBAR (CHAT LIST) - 30% ON DESKTOP */}
        <Grid item xs={12} md={4} lg={3.5} sx={{ height: '100%', borderRight: '1px solid #e2e8f0', display: { xs: activeChatId ? 'none' : 'block', md: 'block' }, bgcolor: 'white', display: 'flex', flexDirection: 'column' }}>
          
          {/* Header */}
          <Box sx={{ p: 3, borderBottom: '1px solid #f1f5f9' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
               <IconButton onClick={() => navigate('/dashboard')} sx={{ mr: 1, color: '#64748b' }}>
                  <FiChevronLeft />
               </IconButton>
               <Typography variant="h5" sx={{ fontWeight: 900, color: '#0f172a' }}>Messages</Typography>
            </Box>
            
            <TextField
              fullWidth
              size="small"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FiSearch color="#94a3b8" />
                  </InputAdornment>
                ),
                sx: { 
                  borderRadius: '100px', 
                  bgcolor: '#f8fafc', 
                  '& fieldset': { border: 'none' }, 
                  '&.Mui-focused': { bgcolor: 'white', boxShadow: '0 0 0 2px #4f46e5 inset' } 
                }
              }}
            />
          </Box>

          {/* Chat List Items */}
          <List sx={{ p: 0, flexGrow: 1, overflowY: 'auto' }}>
            {filteredChats.map((chat) => (
              <ListItem 
                button 
                key={chat.id} 
                onClick={() => handleSelectChat(chat.id)}
                sx={{ 
                  p: 2.5, 
                  borderBottom: '1px solid #f8fafc',
                  bgcolor: activeChatId === chat.id ? '#eef2ff' : 'transparent', // Light blue background
                  borderLeft: activeChatId === chat.id ? '4px solid #4f46e5' : '4px solid transparent', // Left Border Highlight
                  transition: 'all 0.2s ease',
                  '&:hover': { bgcolor: activeChatId === chat.id ? '#eef2ff' : '#f8fafc' }
                }}
              >
                <ListItemAvatar>
                  <Badge 
                    variant="dot" 
                    color="success" 
                    invisible={!chat.user.online}
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    sx={{ '& .MuiBadge-badge': { border: '2px solid white', width: 14, height: 14, borderRadius: '50%', backgroundColor: '#10b981' } }}
                  >
                    <Avatar sx={{ bgcolor: activeChatId === chat.id ? '#4f46e5' : '#e2e8f0', color: activeChatId === chat.id ? 'white' : '#64748b', fontWeight: 800, width: 52, height: 52 }}>
                      {chat.user.avatar}
                    </Avatar>
                  </Badge>
                </ListItemAvatar>
                
                <ListItemText 
                   sx={{ ml: 1 }}
                  primary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: chat.unread > 0 ? 900 : 700, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {chat.user.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: chat.unread > 0 ? '#4f46e5' : '#94a3b8', fontWeight: chat.unread > 0 ? 800 : 600 }}>
                        {chat.lastTime}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography variant="body2" sx={{ color: chat.unread > 0 ? '#1e293b' : '#64748b', fontWeight: chat.unread > 0 ? 700 : 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', pr: 2 }}>
                        {chat.lastMessage}
                      </Typography>
                      {chat.unread > 0 && (
                        <Box sx={{ minWidth: 22, height: 22, borderRadius: '11px', bgcolor: '#4f46e5', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 900, px: 1 }}>
                          {chat.unread}
                        </Box>
                      )}
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Grid>

        {/* 2. RIGHT SIDE (CHAT WINDOW) - 70% ON DESKTOP */}
        <Grid item xs={12} md={8} lg={8.5} sx={{ height: '100%', display: { xs: !activeChatId ? 'none' : 'flex', md: 'flex' }, flexDirection: 'column', bgcolor: '#f8fafc' }}>
          {activeChat ? (
            <>
              {/* Chat Header */}
              <Box sx={{ p: { xs: 2.5, md: 3 }, borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: 'white', position: 'sticky', top: 0, zIndex: 10 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ display: { xs: 'block', md: 'none' }, mr: 2 }}>
                    <IconButton onClick={() => setActiveChatId(null)} sx={{ color: '#64748b' }}>
                      <FiChevronLeft size={24} />
                    </IconButton>
                  </Box>
                  <Avatar sx={{ bgcolor: '#f1f5f9', color: '#4f46e5', fontWeight: 800, mr: 2, width: 44, height: 44 }}>{activeChat.user.avatar}</Avatar>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 900, color: '#0f172a', lineHeight: 1.2 }}>{activeChat.user.name}</Typography>
                    <Typography variant="caption" sx={{ color: activeChat.user.online ? '#10b981' : '#94a3b8', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      {activeChat.user.online && (
                        <span style={{ 
                          width: 8, 
                          height: 8, 
                          borderRadius: '50%', 
                          backgroundColor: '#10b981',
                          animation: 'pulse-green 2s infinite'
                        }}></span>
                      )}
                      {activeChat.user.online ? 'Active Now' : 'Last seen 2h ago'}
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton sx={{ color: '#4f46e5', bgcolor: '#f8fafc', '&:hover': { bgcolor: '#eef2ff' } }}><FiPhone size={18} /></IconButton>
                  <IconButton sx={{ color: '#4f46e5', bgcolor: '#f8fafc', '&:hover': { bgcolor: '#eef2ff' } }}><FiVideo size={18} /></IconButton>
                  <IconButton sx={{ color: '#64748b', '&:hover': { bgcolor: '#f1f5f9' } }}><FiInfo size={20} /></IconButton>
                </Box>
              </Box>

              {/* Messages Area */}
              <Box sx={{ flexGrow: 1, overflowY: 'auto', p: { xs: 2, md: 4 }, display: 'flex', flexDirection: 'column', gap: 2 }}>
                
                {/* Date Divider */}
                <Box sx={{ textAlign: 'center', my: 2 }}>
                  <Typography variant="caption" sx={{ bgcolor: 'white', border: '1px solid #e2e8f0', color: '#64748b', px: 3, py: 0.75, borderRadius: '100px', fontWeight: 700, boxShadow: '0 1px 2px rgb(0 0 0 / 0.05)' }}>
                    Today
                  </Typography>
                </Box>

                {activeChat.messages.map((msg, index) => {
                  const isMe = msg.senderId === 'me';
                  
                  return (
                    <Box key={msg.id} sx={{ display: 'flex', justifyContent: isMe ? 'flex-end' : 'flex-start', mb: 1, px: { xs: 1, md: 4 } }}>
                      <Box sx={{ maxWidth: '75%', display: 'flex', flexDirection: 'column', alignItems: isMe ? 'flex-end' : 'flex-start' }}>
                        <Paper 
                          elevation={0}
                          sx={{ 
                            p: 2, 
                            bgcolor: isMe ? 'transparent' : '#f1f5f9', // Gradient handled below for 'me'
                            background: isMe ? 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)' : '#f1f5f9', // Gradient Blue
                            color: isMe ? 'white' : '#0f172a', // White text for me, Dark for other
                            borderRadius: isMe ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                            boxShadow: isMe ? '0 4px 14px 0 rgba(79, 70, 229, 0.2)' : 'none',
                          }}
                        >
                          <Typography variant="body1" sx={{ fontWeight: 500, lineHeight: 1.5, fontSize: '0.95rem' }}>
                            {msg.text}
                          </Typography>
                        </Paper>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5, px: 0.5 }}>
                          <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600 }}>
                            {msg.time}
                          </Typography>
                          {isMe && msg.status && (
                            <Box sx={{ color: msg.status === 'seen' ? '#3b82f6' : '#cbd5e1', display: 'flex' }}>
                              {msg.status === 'seen' ? <IoCheckmarkDoneOutline size={16} /> : <IoCheckmarkOutline size={16} />}
                           </Box>
                          )}
                        </Box>
                      </Box>
                    </Box>
                  );
                })}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 1, px: { xs: 1, md: 4 } }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <Typography sx={{ ml: 1, mb: 0.5, fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>
                           {activeChat.user.name.split(' ')[0]} is typing...
                        </Typography>
                        <Paper elevation={0} sx={{ p: 1.5, bgcolor: '#f1f5f9', borderRadius: '16px 16px 16px 4px', display: 'flex', gap: 0.5 }}>
                          <Box sx={{ width: 6, height: 6, bgcolor: '#cbd5e1', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out both' }} />
                          <Box sx={{ width: 6, height: 6, bgcolor: '#cbd5e1', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out both', animationDelay: '0.2s' }} />
                          <Box sx={{ width: 6, height: 6, bgcolor: '#cbd5e1', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out both', animationDelay: '0.4s' }} />
                        </Paper>
                    </Box>
                  </Box>
                )}
                <div ref={messagesEndRef} />
              </Box>

              {/* Input Area */}
              <Box sx={{ p: { xs: 2, md: 3 }, bgcolor: 'white', borderTop: '1px solid #e2e8f0' }}>
                <form onSubmit={handleSendMessage} style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', maxWidth: '900px', margin: '0 auto' }}>
                  <IconButton sx={{ color: '#94a3b8', mb: 0.5, '&:hover': { color: '#4f46e5', bgcolor: '#f8fafc' } }}>
                    <FiPaperclip size={24} />
                  </IconButton>
                  
                  <TextField
                    fullWidth
                    multiline
                    maxRows={4}
                    placeholder="Type a message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage(e);
                      }
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton size="small" sx={{ color: '#94a3b8' }}>
                            <FiSmile size={20} />
                          </IconButton>
                        </InputAdornment>
                      ),
                      sx: { 
                        borderRadius: '100px', 
                        bgcolor: '#f1f5f9',
                        p: '10px 14px',
                        '& fieldset': { border: 'none' },
                        '&.Mui-focused': { bgcolor: 'white', boxShadow: '0 0 0 2px #4f46e5 inset' },
                        fontSize: '0.95rem',
                        fontWeight: 500
                      }
                    }}
                  />
                  
                  <Box sx={{ mb: 0.5 }}>
                    <IconButton 
                      type="submit"
                      disabled={!messageText.trim()}
                      sx={{ 
                        bgcolor: messageText.trim() ? '#4f46e5' : '#e2e8f0', 
                        color: 'white', 
                        p: 1.5,
                        '&:hover': { bgcolor: messageText.trim() ? '#4338ca' : '#e2e8f0' },
                        '&.Mui-disabled': { bgcolor: '#f1f5f9', color: '#cbd5e1' },
                        transition: 'all 0.2s',
                        transform: messageText.trim() ? 'scale(1.05)' : 'scale(1)'
                      }}
                    >
                      <FiSend size={20} style={{ transform: 'translateX(-1px) translateY(1px)' }} />
                    </IconButton>
                  </Box>
                </form>
              </Box>

               <style dangerouslySetInnerHTML={{__html: `
                  @keyframes bounce {
                     0%, 80%, 100% { transform: translateY(0); }
                     40% { transform: translateY(-4px); }
                  }
                  @keyframes pulse-green {
                     0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
                     70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
                     100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
                  }
               `}} />
            </>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', bgcolor: '#f8fafc', p: 4 }}>
              <Box sx={{ width: 100, height: 100, borderRadius: '50%', bgcolor: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                <FiSend size={40} color="#4f46e5" style={{ transform: 'translateX(-2px) translateY(2px)' }} />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 900, color: '#0f172a', mb: 1 }}>Your Messages</Typography>
              <Typography variant="body1" sx={{ color: '#64748b', fontWeight: 500, textAlign: 'center', maxWidth: 400 }}>
                Select a conversation from the sidebar or start a new chat to connect with recruiters and companies.
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
    </>
  );
};

export default Messages;
