import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  Button, 
  IconButton, 
  Grid, 
  MenuItem, 
  FormControlLabel, 
  Switch, 
  Chip, 
  Box,
  Typography,
  CircularProgress,
  Autocomplete,
  Avatar,
  Paper
} from '@mui/material';
import { 
  FiX, 
  FiBriefcase, 
  FiMapPin, 
  FiDollarSign, 
  FiType, 
  FiLayers, 
  FiCalendar, 
  FiStar, 
  FiSend, 
  FiEye,
  FiZap
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const JOB_TYPES = ["Full-time", "Part-time", "Remote", "Internship"];
const EXPERIENCE_LEVELS = ["Fresher", "1-3 years", "3-5 years", "5+ years"];

const AddJobModal = ({ open, onClose, onSave, editingJob = null }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    company: { name: '', location: '', logo: '' },
    location: '',
    jobType: 'Full-time',
    experience: 'Fresher',
    salary: { min: '', max: '' },
    skills: [],
    tags: [],
    deadline: '',
    isFeatured: false
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingJob) {
      setFormData({
        ...editingJob,
        salary: {
          min: editingJob.salary?.min || '',
          max: editingJob.salary?.max || ''
        },
        deadline: editingJob.deadline ? new Date(editingJob.deadline).toISOString().split('T')[0] : ''
      });
    } else {
      setFormData({
        title: '',
        description: '',
        company: { name: '', location: '', logo: '' },
        location: '',
        jobType: 'Full-time',
        experience: 'Fresher',
        salary: { min: '', max: '' },
        skills: [],
        tags: [],
        deadline: '',
        isFeatured: false
      });
    }
  }, [editingJob, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // --- Real-time Preview Component ---
  const JobPreviewCard = () => (
    <Paper 
      elevation={0}
      sx={{ 
        p: 3, 
        borderRadius: '24px', 
        border: '1px solid #e2e8f0', 
        bgcolor: '#fff',
        position: 'sticky',
        top: 0,
        boxShadow: formData.isFeatured ? '0 20px 25px -5px rgba(234, 179, 8, 0.1), 0 8px 10px -6px rgba(234, 179, 8, 0.1)' : '0 4px 6px -1px rgba(0,0,0,0.05)'
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Avatar 
          src={formData.company.logo} 
          variant="rounded" 
          sx={{ width: 56, height: 56, bgcolor: '#f8fafc', border: '1px solid #f1f5f9' }}
        >
          {formData.company.name?.[0] || 'C'}
        </Avatar>
        {formData.isFeatured && (
          <Chip 
            label="Featured" 
            size="small" 
            icon={<FiZap size={12} />} 
            sx={{ bgcolor: '#fefce8', color: '#a16207', fontWeight: 900, border: '1px solid #fef08a' }} 
          />
        )}
      </Box>

      <Typography variant="h6" fontWeight={900} color="#0f172a" sx={{ mb: 0.5 }}>
        {formData.title || 'Job Title Placeholder'}
      </Typography>
      <Typography variant="body2" fontWeight={700} color="#6366f1" gutterBottom>
        {formData.company.name || 'Company Name'} • {formData.location || 'Location'}
      </Typography>

      <Box sx={{ display: 'flex', gap: 1, my: 2 }}>
        <Chip label={formData.jobType} size="small" sx={{ fontWeight: 800, borderRadius: '8px', bgcolor: '#f1f5f9' }} />
        <Chip label={formData.experience} size="small" sx={{ fontWeight: 800, borderRadius: '8px', bgcolor: '#f1f5f9' }} />
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ 
        mb: 2, 
        display: '-webkit-box', 
        WebkitLineClamp: 3, 
        WebkitBoxOrient: 'vertical', 
        overflow: 'hidden',
        minHeight: '60px'
      }}>
        {formData.description || 'Provide a description to see it here. Developers love reading clear responsibilities...'}
      </Typography>

      <Box sx={{ pt: 2, borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="subtitle2" fontWeight={900} color="#0f172a">
          {formData.salary.min ? `₹${formData.salary.min}` : 'Min'} - {formData.salary.max ? `₹${formData.salary.max}` : 'Max'}
        </Typography>
        <Button variant="contained" disabled sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 800, bgcolor: '#4f46e5 !important' }}>Details</Button>
      </Box>
    </Paper>
  );

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="lg" 
      fullWidth
      PaperProps={{
        sx: { borderRadius: '28px', overflow: 'hidden' }
      }}
    >
      {/* 1. Enhanced Header */}
      <Box sx={{ p: 4, pb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', bgcolor: '#fff' }}>
        <Box>
           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 0.5 }}>
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center animate-pulse">
                 <FiSend className="text-indigo-600 text-2xl" />
              </div>
              <Typography variant="h4" fontWeight={900} color="#0f172a">
                {editingJob ? 'Refine Job Listing' : 'Post New Opening'}
              </Typography>
           </Box>
           <Typography variant="body1" color="text.secondary" fontWeight={500} sx={{ ml: 7 }}>
              Configure your hiring requirements and publish to thousands of candidates.
           </Typography>
        </Box>
        <IconButton onClick={onClose} sx={{ bgcolor: '#f8fafc', '&:hover': { bgcolor: '#f1f5f9' } }}>
          <FiX />
        </IconButton>
      </Box>

      <DialogContent sx={{ p: 4 }}>
        <Grid container spacing={5}>
          {/* Left Column: The Form (7.5 units) */}
          <Grid item xs={12} lg={7.5}>
            <Box component="form" className="space-y-8">
              
              {/* Section 1: Role Overview */}
              <Box className="space-y-4">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#4f46e5', mb: 1 }}>
                   <FiBriefcase fontWeight={900} />
                   <Typography variant="overline" sx={{ fontWeight: 900, letterSpacing: 1.5 }}>Role Overview</Typography>
                </Box>
                
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="caption" fontWeight={800} color="#64748b" sx={{ mb: 1, display: 'block' }}>JOB TITLE *</Typography>
                    <TextField
                      fullWidth name="title" value={formData.title} onChange={handleChange} required
                      placeholder="e.g. Lead Software Engineer (Full Stack)"
                      InputProps={{ sx: { borderRadius: '16px', bgcolor: '#f8fafc', border: 'none', '& fieldset': { border: '1px solid #e2e8f0' } } }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="caption" fontWeight={800} color="#64748b" sx={{ mb: 1, display: 'block' }}>JOB DESCRIPTION *</Typography>
                    <TextField
                      fullWidth name="description" value={formData.description} onChange={handleChange} 
                      required multiline rows={6}
                      placeholder="Explain the day-to-day tasks, stack, and culture..."
                      InputProps={{ sx: { borderRadius: '16px', bgcolor: '#f8fafc', border: 'none', '& fieldset': { border: '1px solid #e2e8f0' } } }}
                    />
                  </Grid>
                </Grid>
              </Box>

              {/* Section 2: Company & Logistics */}
              <Box className="space-y-4">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#4f46e5', mb: 1 }}>
                   <FiMapPin fontWeight={900} />
                   <Typography variant="overline" sx={{ fontWeight: 900, letterSpacing: 1.5 }}>Company & Logistics</Typography>
                </Box>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="caption" fontWeight={800} color="#64748b" sx={{ mb: 1, display: 'block' }}>COMPANY NAME *</Typography>
                    <TextField
                      fullWidth name="company.name" value={formData.company.name} onChange={handleChange} required
                      InputProps={{ sx: { borderRadius: '16px', border: 'none' } }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="caption" fontWeight={800} color="#64748b" sx={{ mb: 1, display: 'block' }}>JOB LOCATION *</Typography>
                    <TextField
                      fullWidth name="location" value={formData.location} onChange={handleChange} required
                      placeholder="e.g. Remote, Mumbai, Hybrid"
                      InputProps={{ sx: { borderRadius: '16px'} }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="caption" fontWeight={800} color="#64748b" sx={{ mb: 1, display: 'block' }}>JOB TYPE</Typography>
                    <TextField
                      select fullWidth name="jobType" value={formData.jobType} onChange={handleChange}
                      InputProps={{ sx: { borderRadius: '16px'} }}
                    >
                      {JOB_TYPES.map(type => <MenuItem key={type} value={type}>{type}</MenuItem>)}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="caption" fontWeight={800} color="#64748b" sx={{ mb: 1, display: 'block' }}>EXPERIENCE LEVEL</Typography>
                    <TextField
                      select fullWidth name="experience" value={formData.experience} onChange={handleChange}
                      InputProps={{ sx: { borderRadius: '16px'} }}
                    >
                      {EXPERIENCE_LEVELS.map(level => <MenuItem key={level} value={level}>{level}</MenuItem>)}
                    </TextField>
                  </Grid>
                </Grid>
              </Box>

              {/* Section 3: Compensation & Deadline */}
              <Box className="space-y-4">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#4f46e5', mb: 1 }}>
                   <FiDollarSign fontWeight={900} />
                   <Typography variant="overline" sx={{ fontWeight: 900, letterSpacing: 1.5 }}>Compensation & Timeline</Typography>
                </Box>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} md={8}>
                     <Typography variant="caption" fontWeight={800} color="#64748b" sx={{ mb: 1, display: 'block' }}>SALARY RANGE (CTC)</Typography>
                     <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <TextField
                           fullWidth placeholder="Min" type="number" name="salary.min" value={formData.salary.min} onChange={handleChange}
                           InputProps={{ startAdornment: <Typography variant="caption" sx={{ mr: 1, fontWeight: 900 }}>₹</Typography>, sx: { borderRadius: '16px' } }}
                        />
                        <span className="text-slate-300">—</span>
                        <TextField
                           fullWidth placeholder="Max" type="number" name="salary.max" value={formData.salary.max} onChange={handleChange}
                           InputProps={{ startAdornment: <Typography variant="caption" sx={{ mr: 1, fontWeight: 900 }}>₹</Typography>, sx: { borderRadius: '16px' } }}
                        />
                     </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="caption" fontWeight={800} color="#64748b" sx={{ mb: 1, display: 'block' }}>DEADLINE</Typography>
                    <TextField
                      fullWidth type="date" name="deadline" value={formData.deadline} onChange={handleChange}
                      InputProps={{ sx: { borderRadius: '16px' } }}
                    />
                  </Grid>
                </Grid>
              </Box>

              {/* Section 4: Skills (Autocomplete) */}
              <Box className="space-y-4">
                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#4f46e5', mb: 1 }}>
                    <FiStar fontWeight={900} />
                    <Typography variant="overline" sx={{ fontWeight: 900, letterSpacing: 1.5 }}>Skills & Requirements</Typography>
                 </Box>
                 <Autocomplete
                   multiple
                   freeSolo
                   options={[]}
                   value={formData.skills}
                   onChange={(e, newValue) => setFormData(prev => ({ ...prev, skills: newValue }))}
                   renderTags={(value, getTagProps) =>
                     value.map((option, index) => (
                       <Chip label={option} {...getTagProps({ index })} sx={{ borderRadius: '8px', fontWeight: 700, bgcolor: '#eef2ff', color: '#4f46e5' }} />
                     ))
                   }
                   renderInput={(params) => (
                     <TextField {...params} placeholder="Add specific skills (Enter to add)" InputProps={{ ...params.InputProps, sx: { borderRadius: '16px' } }} />
                   )}
                 />
              </Box>

            </Box>
          </Grid>

          {/* Right Column: Live Preview (4.5 units) */}
          <Grid item xs={12} lg={4.5}>
             <Box sx={{ position: 'sticky', top: 20 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                   <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                      <FiEye className="text-orange-600" />
                   </div>
                   <Box>
                      <Typography variant="subtitle1" fontWeight={900} color="#0f172a">Live Preview</Typography>
                      <Typography variant="caption" color="text.secondary">How candidates see your job</Typography>
                   </Box>
                </Box>
                
                <JobPreviewCard />

                {/* Featured Toggle Upgrade */}
                <Box sx={{ 
                  mt: 4, 
                  p: 3, 
                  borderRadius: '24px', 
                  bgcolor: formData.isFeatured ? '#fefce8' : '#f8fafc',
                  border: formData.isFeatured ? '1px solid #fef08a' : '1px solid #f1f5f9',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                }}>
                   <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                         <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${formData.isFeatured ? 'bg-yellow-400 text-white shadow-lg shadow-yellow-200' : 'bg-slate-200 text-slate-500'}`}>
                            <FiStar size={24} />
                         </div>
                         <Box>
                             <Typography variant="body1" fontWeight={900} color="#1e293b">Push as Featured</Typography>
                             <Typography variant="caption" color="text.secondary">Boost to the top of list</Typography>
                         </Box>
                      </Box>
                      <Switch 
                        checked={formData.isFeatured} 
                        onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
                        color="primary"
                        sx={{ 
                          '& .MuiSwitch-switchBase.Mui-checked': { color: '#eab308' },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#eab308' },
                        }}
                      />
                   </Box>
                </Box>
             </Box>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 4, gap: 3, bgcolor: '#fff', borderTop: '1px solid #f1f5f9' }}>
        <Button onClick={onClose} sx={{ color: '#64748b', fontWeight: 800, textTransform: 'none' }}>Save as Draft</Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          disabled={loading}
          sx={{ 
            bgcolor: '#4f46e5', 
            '&:hover': { bgcolor: '#4338ca' },
            borderRadius: '16px',
            px: 6,
            py: 2,
            fontWeight: 900,
            textTransform: 'none',
            fontSize: '15px',
            boxShadow: '0 20px 25px -5px rgba(79, 70, 229, 0.4)'
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : editingJob ? 'Save Changes' : 'Publish Job Live 🔥'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddJobModal;
