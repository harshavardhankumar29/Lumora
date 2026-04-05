"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { 
  User as UserIcon, Mail, Phone, MapPin, Loader2, Camera, Plus, X, FileText, Upload, Settings
} from "lucide-react";
import toast from "react-hot-toast";

import { userApi, userFormApi } from "@/lib/api";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AccountPage() {
  const router = useRouter();
  const { isAuth, user, setUser, loading: contextLoading } = useAppContext();
  
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  
  const [profileData, setProfileData] = useState({
    name: "",
    phoneNumber: "",
    bio: ""
  });
  
  const [newSkill, setNewSkill] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!contextLoading) {
      if (!isAuth) {
        router.push("/login");
      } else {
        if (user) {
          setProfileData({
            name: user.name || "",
            phoneNumber: user.phone_number || "",
            bio: user.bio || ""
          });
        }
        setLoading(false);
      }
    }
  }, [isAuth, contextLoading, user, router]);

  const refreshUser = async () => {
    try {
      const res = await userApi.get("/me");
      setUser(res.data);
    } catch {}
  };

  const handleUpdateProfile = async () => {
    try {
      await userApi.put("/update/profile", profileData);
      await refreshUser();
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile.");
    }
  };

  const handleProfilePicUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const formData = new FormData();
    formData.append("file", file);
    
    const toastId = toast.loading("Uploading picture...");
    try {
      await userFormApi.put("/update/pic", formData);
      await refreshUser();
      toast.success("Profile picture updated!", { id: toastId });
    } catch (error) {
      toast.error("Failed to upload picture.", { id: toastId });
    }
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const formData = new FormData();
    formData.append("file", file);
    
    const toastId = toast.loading("Uploading resume...");
    try {
      await userFormApi.put("/update/resume", formData);
      await refreshUser();
      toast.success("Resume updated!", { id: toastId });
    } catch (error) {
      toast.error("Failed to upload resume.", { id: toastId });
    }
  };

  const addSkill = async () => {
    if (!newSkill.trim()) return;
    try {
      await userApi.post("/skill/add", { skillName: newSkill.trim() });
      await refreshUser();
      setNewSkill("");
      toast.success("Skill added!");
    } catch (error) {
      toast.error("Failed to add skill.");
    }
  };

  const removeSkill = async (skillName: string) => {
    try {
      await userApi.delete("/skill/delete", { data: { skillName } });
      await refreshUser();
      toast.success("Skill removed");
    } catch (error) {
      toast.error("Failed to remove skill.");
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-zinc-50 dark:bg-black pt-32 pb-16 px-4 selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-900 border-b border-zinc-200 dark:border-zinc-900">
      {/* Ambient Depth and Grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)]" />
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
            <div className="w-[800px] h-[800px] bg-zinc-400/20 dark:bg-zinc-800/20 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-8 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out fill-mode-both">
        
        {/* Sidebar */}
        <div className="w-full lg:w-80 shrink-0">
          <div className="bg-white/70 dark:bg-zinc-950/70 backdrop-blur-2xl rounded-[32px] p-8 sticky top-28 flex flex-col items-center border border-zinc-200/80 dark:border-zinc-800/80 shadow-[0_8px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_40px_rgba(255,255,255,0.02)] transition-shadow hover:shadow-[0_8px_50px_rgba(0,0,0,0.08)]">
            <div className="relative group mb-6">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 overflow-hidden flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                {user.profile_pic ? (
                  <img src={user.profile_pic} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <UserIcon className="w-10 h-10 text-zinc-400" />
                )}
              </div>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white cursor-pointer"
              >
                <Camera className="w-6 h-6" />
              </button>
              <input type="file" ref={fileInputRef} onChange={handleProfilePicUpload} accept="image/*" className="hidden" />
            </div>

            <h2 className="text-2xl font-black tracking-tight mb-1 text-center text-zinc-900 dark:text-zinc-100">{user.name}</h2>
            <p className="text-indigo-600 dark:text-indigo-400 text-sm font-bold mb-6 capitalize tracking-wide">{user.role}</p>

            <div className="w-full space-y-3 mb-8">
              <div className="flex items-center text-sm text-zinc-600 dark:text-zinc-400 p-3 bg-white/50 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl shadow-sm">
                <Mail className="w-4 h-4 mr-3 shrink-0" />
                <span className="truncate font-medium">{user.email}</span>
              </div>
              <div className="flex items-center text-sm text-zinc-600 dark:text-zinc-400 p-3 bg-white/50 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl shadow-sm">
                <Phone className="w-4 h-4 mr-3 shrink-0" />
                <span className="font-medium">{user.phone_number}</span>
              </div>
            </div>

            <div className="w-full space-y-2 border-t border-zinc-200/80 dark:border-zinc-800/80 pt-6">
              <Button 
                variant={activeTab === "profile" ? "default" : "ghost"} 
                onClick={() => setActiveTab("profile")}
                className={`w-full justify-start rounded-2xl h-12 text-sm font-bold transition-all duration-200 ${activeTab === "profile" ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_20px_rgba(255,255,255,0.1)]" : "text-zinc-600 dark:text-zinc-400 hover:bg-white/60 dark:hover:bg-zinc-800/50"}`}
              >
                <Settings className="w-5 h-5 mr-3" /> Profile Details
              </Button>
              {user.role === "jobseeker" && (
                <Button 
                  variant={activeTab === "skills" ? "default" : "ghost"} 
                  onClick={() => setActiveTab("skills")}
                  className={`w-full justify-start rounded-2xl h-12 text-sm font-bold transition-all duration-200 ${activeTab === "skills" ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_20px_rgba(255,255,255,0.1)]" : "text-zinc-600 dark:text-zinc-400 hover:bg-white/60 dark:hover:bg-zinc-800/50"}`}
                >
                  <FileText className="w-5 h-5 mr-3" /> Resume & Skills
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <div key={activeTab} className="bg-white/70 dark:bg-zinc-950/70 backdrop-blur-2xl rounded-[32px] p-8 sm:p-10 border border-zinc-200/80 dark:border-zinc-800/80 shadow-[0_8px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_40px_rgba(255,255,255,0.02)] transition-shadow hover:shadow-[0_8px_50px_rgba(0,0,0,0.08)] animate-in fade-in slide-in-from-right-8 duration-700 ease-out fill-mode-both">
            {activeTab === "profile" && (
              <div>
                <h3 className="text-2xl font-black tracking-tight mb-8 text-zinc-900 dark:text-zinc-100 border-b border-zinc-200/80 dark:border-zinc-800/80 pb-6">Personal Information</h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 ml-1">Full Name</label>
                      <Input 
                        value={profileData.name} 
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                        className="h-14 bg-white/50 dark:bg-zinc-900/50 border-zinc-200/80 dark:border-zinc-800/80 focus-visible:ring-1 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100 rounded-2xl transition-all shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 ml-1">Phone Number</label>
                      <Input 
                        value={profileData.phoneNumber} 
                        onChange={(e) => setProfileData({...profileData, phoneNumber: e.target.value})}
                        className="h-14 bg-white/50 dark:bg-zinc-900/50 border-zinc-200/80 dark:border-zinc-800/80 focus-visible:ring-1 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100 rounded-2xl transition-all shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 font-medium"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 ml-1">Bio / About Me</label>
                    <textarea 
                      value={profileData.bio} 
                      onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                      className="w-full p-4 min-h-[150px] bg-white/50 dark:bg-zinc-900/50 border-zinc-200/80 dark:border-zinc-800/80 focus-visible:ring-1 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100 rounded-2xl transition-all shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 outline-none text-sm resize-none font-medium"
                      placeholder="Write a few sentences about yourself..."
                    />
                  </div>

                  <Button 
                    onClick={handleUpdateProfile}
                    className="h-14 px-8 mt-4 rounded-2xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition-all duration-200 active:scale-[0.98] font-bold shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_20px_rgba(255,255,255,0.1)]"
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            )}

            {activeTab === "skills" && user.role === "jobseeker" && (
              <div>
                <h3 className="text-2xl font-black tracking-tight mb-8 text-zinc-900 dark:text-zinc-100 border-b border-zinc-200/80 dark:border-zinc-800/80 pb-6">Professional Skills</h3>
                
                <div className="mb-12">
                  <div className="flex gap-4">
                    <Input 
                      value={newSkill} 
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="E.g. React.js, Python, Project Management"
                      className="h-14 flex-1 bg-white/50 dark:bg-zinc-900/50 border-zinc-200/80 dark:border-zinc-800/80 focus-visible:ring-1 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100 rounded-2xl transition-all shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 font-medium"
                      onKeyDown={(e) => e.key === "Enter" && addSkill()}
                    />
                    <Button onClick={addSkill} className="h-14 px-8 rounded-2xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition-all duration-200 active:scale-[0.98] font-bold shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_20px_rgba(255,255,255,0.1)]">
                      <Plus className="w-6 h-6" />
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 mt-8">
                    {user.skills?.map((skill) => (
                      <span key={skill} className="flex items-center gap-1.5 bg-white/60 dark:bg-zinc-900/80 px-4 py-2 rounded-xl text-sm font-bold tracking-wide border border-zinc-200/80 dark:border-zinc-800/80 text-zinc-800 dark:text-zinc-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-md transition-shadow">
                        {skill}
                        <button onClick={() => removeSkill(skill)} className="text-zinc-400 hover:text-red-500 transition-colors rounded-md p-1 ml-1 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                          <X className="w-4 h-4" />
                        </button>
                      </span>
                    ))}
                    {(!user.skills || user.skills.length === 0) && (
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">No skills added yet.</p>
                    )}
                  </div>
                </div>

                <h3 className="text-2xl font-black tracking-tight mb-8 text-zinc-900 dark:text-zinc-100 border-b border-zinc-200/80 dark:border-zinc-800/80 pb-6">Resume</h3>
                <div className="p-8 bg-white/40 dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/80 rounded-[28px] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                      <FileText className={`w-6 h-6 ${user.resume ? "text-green-500" : "text-zinc-400"}`} />
                    </div>
                    <div>
                      <p className="font-bold text-lg text-zinc-900 dark:text-zinc-100">{user.resume ? "Resume Ready" : "No Resume Uploaded"}</p>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium mt-0.5">PDF format recommended</p>
                    </div>
                  </div>
                  <div className="flex w-full sm:w-auto items-center gap-3">
                    {user.resume && (
                      <a href={user.resume} target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-auto">
                        <Button variant="outline" className="w-full rounded-2xl h-12 px-6 border-zinc-200/80 dark:border-zinc-800/80 shadow-sm font-bold bg-white/50 dark:bg-zinc-900/50 hover:bg-white dark:hover:bg-zinc-800 transition-colors">View PDF</Button>
                      </a>
                    )}
                    <Button onClick={() => resumeInputRef.current?.click()} className="flex-1 sm:flex-auto rounded-2xl h-12 px-6 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition-all font-bold shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_20px_rgba(255,255,255,0.1)]">
                      <Upload className="w-4 h-4 mr-2" /> {user.resume ? 'Update' : 'Upload'}
                    </Button>
                    <input type="file" ref={resumeInputRef} onChange={handleResumeUpload} accept=".pdf,.doc,.docx" className="hidden" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}