import React, { useState, useEffect, useRef } from 'react';
import { 
  FiSearch, 
  FiSend, 
  FiMoreVertical, 
  FiInfo, 
  FiUser, 
  FiPhone, 
  FiMail, 
  FiTrash2, 
  FiClock,
  FiCheck,
  FiFilter
} from 'react-icons/fi';
import { io } from 'socket.io-client';
import { motion, AnimatePresence } from 'framer-motion';
import { messageService } from '../../services/messageService';
import { useAuth } from '../../context/useAuth';

const socket = io('http://localhost:7001');

const AdminMessages = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  
  const chatEndRef = useRef(null);

  // Initial Load
  useEffect(() => {
    fetchConversations();
  }, []);

  // Socket setup
  useEffect(() => {
    if (selectedChat) {
      socket.emit('join_room', selectedChat._id);
      
      const receiveMessageHandler = (data) => {
        if (data.sender === selectedChat._id) {
           setMessages((prev) => [...prev, data]);
        }
      };

      socket.on('receive_message', receiveMessageHandler);
      
      return () => {
        socket.off('receive_message', receiveMessageHandler);
      };
    }
  }, [selectedChat]);

  // Scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchConversations = async () => {
    try {
      const res = await messageService.getConversations();
      setConversations(res);
    } catch (error) {
      console.error("Fetch conversations error:", error);
    }
  };

  const selectConversation = async (contact) => {
    setSelectedChat(contact);
    setLoading(true);
    try {
      const res = await messageService.getMessages(contact._id);
      setMessages(res);
    } catch (error) {
      console.error("Fetch messages error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat) return;

    const messageData = {
      room: selectedChat._id,
      sender: user.id || user._id,
      receiver: selectedChat._id,
      content: newMessage,
      timestamp: new Date().toISOString()
    };

    socket.emit('send_message', messageData);
    
    // Save to DB
    try {
      await messageService.sendMessage({
        receiverId: selectedChat._id,
        content: newMessage
      });
      setMessages((prev) => [...prev, { ...messageData, createdAt: new Date() }]);
      setNewMessage('');
    } catch (error) {
      console.error("Send message error:", error);
    }
  };

  const filteredConversations = conversations.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-[calc(100vh-100px)] bg-white border border-slate-100 rounded-[40px] overflow-hidden shadow-2xl shadow-slate-200/50">
      
      {/* 📁 LEFT: Chat Directory (30%) */}
      <div className="w-[30%] border-r border-slate-50 flex flex-col bg-slate-50/30">
        <div className="p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Messages</h2>
            <button className="w-10 h-10 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:text-blue-600 transition-colors">
              <FiFilter />
            </button>
          </div>
          
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-bold placeholder:text-slate-300 outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-8 space-y-2">
          {filteredConversations.length > 0 ? (
            filteredConversations.map((contact) => (
              <button 
                key={contact._id}
                onClick={() => selectConversation(contact)}
                className={`w-full p-4 rounded-3xl flex items-center gap-4 transition-all group ${selectedChat?._id === contact._id ? 'bg-blue-600 shadow-xl shadow-blue-100' : 'hover:bg-white hover:shadow-lg hover:shadow-slate-100'}`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-sm relative ${selectedChat?._id === contact._id ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  {contact.name.charAt(0)}
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <p className={`font-black text-sm truncate ${selectedChat?._id === contact._id ? 'text-white' : 'text-slate-900'}`}>{contact.name}</p>
                    <span className={`text-[10px] whitespace-nowrap ${selectedChat?._id === contact._id ? 'text-blue-200' : 'text-slate-400 font-bold'}`}>2 min ago</span>
                  </div>
                  <p className={`text-xs truncate ${selectedChat?._id === contact._id ? 'text-blue-100' : 'text-slate-400 font-medium font-bold'}`}>
                    {contact.lastMessage || "Start a conversation..."}
                  </p>
                </div>
              </button>
            ))
          ) : (
            <div className="text-center py-20 opacity-20">
              <FiMail className="text-5xl mx-auto mb-4" />
              <p className="font-black">No Active Conversations</p>
            </div>
          )}
        </div>
      </div>

      {/* 💬 RIGHT: Chat window (70%) */}
      <div className="flex-1 flex flex-col bg-white">
        {selectedChat ? (
          <>
            {/* Header */}
            <div className="px-10 py-6 border-b border-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center font-black text-slate-400">
                  {selectedChat.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-black text-slate-900 leading-none mb-1">{selectedChat.name}</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Active Now</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center hover:bg-slate-100 transition-colors">
                  <FiPhone />
                </button>
                <button className="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center hover:bg-slate-100 transition-colors">
                  <FiMoreVertical />
                </button>
              </div>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-12 space-y-8 bg-[#fcfdfe]">
              <AnimatePresence>
                {messages.map((msg, i) => {
                  const isAdmin = msg.sender === (user.id || user._id);
                  return (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${isAdmin ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[70%] ${isAdmin ? 'space-y-2' : 'space-y-2'}`}>
                         <div className={`px-6 py-4 rounded-[28px] text-sm font-bold shadow-sm ${
                           isAdmin 
                            ? 'bg-blue-600 text-white rounded-br-none shadow-blue-100' 
                            : 'bg-white text-slate-700 border border-slate-50 rounded-bl-none shadow-slate-50'
                         }`}>
                           {msg.content}
                         </div>
                         <div className={`flex items-center gap-2 px-2 ${isAdmin ? 'justify-end' : 'justify-start'}`}>
                            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-tighter">
                                {new Date(msg.createdAt || msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            {isAdmin && <FiCheck className="text-[10px] text-blue-400" />}
                         </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              <div ref={chatEndRef} />
            </div>

            {/* Input Bar */}
            <div className="px-10 py-8 border-t border-slate-50">
               <form onSubmit={handleSendMessage} className="relative">
                  <input 
                    type="text" 
                    placeholder={`Reply to ${selectedChat.name}...`}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="w-full pl-8 pr-24 py-6 bg-slate-50 rounded-[32px] font-bold text-slate-900 border-none outline-none ring-2 ring-transparent focus:ring-blue-500/10 transition-all placeholder:text-slate-300"
                  />
                  <button 
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all"
                  >
                    <FiSend className="text-xl" />
                  </button>
               </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-20 space-y-6">
            <div className="w-24 h-24 bg-slate-50 text-slate-200 rounded-full flex items-center justify-center text-4xl font-black">
              @
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Messaging Center</h3>
              <p className="max-w-xs mx-auto text-slate-400 font-bold mt-2">Select a professional from the left to start a real-time command session.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMessages;
