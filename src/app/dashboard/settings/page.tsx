"use client";

import { useState, useEffect, useRef } from "react";
import { SettingsSkeleton } from "@/components/ui/Skeleton";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useColorTheme, type BaseColorTheme } from "@/contexts/ColorThemeContext";
import { cn } from "@/lib/utils";
import {
  User,
  Mail,
  FileText,
  Phone,
  MapPin,
  Camera,
  Save,
  Palette,
  Globe,
  Loader2,
  CheckCircle,
  AlertCircle,
  X,
  Lock,
} from "lucide-react";
import Link from "next/link";

interface FormErrors {
  name?: string;
  email?: string;
}

interface ToastState {
  show: boolean;
  type: "success" | "error";
  message: string;
}

export default function SettingsPage() {
  const { user, updateProfile } = useAuth();
  const { theme, setTheme } = useTheme();
  const { baseColorTheme, setColorTheme } = useColorTheme();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Profile state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileErrors, setProfileErrors] = useState<FormErrors>({});
  const [profileTouched, setProfileTouched] = useState<Record<string, boolean>>({});

  // Language
  const [language, setLanguage] = useState("en");

  // Toast
  const [toast, setToast] = useState<ToastState>({ show: false, type: "success", message: "" });
  useEffect(() => {
    if (toast.show) {
      const t = setTimeout(() => setToast((p) => ({ ...p, show: false })), 3000);
      return () => clearTimeout(t);
    }
  }, [toast.show]);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setBio(user.bio || "");
      setPhone(user.phone || "");
      setLocation(user.location || "");
    }
  }, [user]);

  const validateEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const validateProfileField = (field: string, value?: string): string | undefined => {
    switch (field) {
      case "name": {
        const val = value ?? name; if (!val.trim()) return "Name is required"; return undefined;
      }
      case "email": {
        const val = value ?? email; if (!val.trim()) return "Email is required"; if (!validateEmail(val)) return "Please enter a valid email address"; return undefined;
      }
      default: return undefined;
    }
  };
  const handleProfileBlur = (field: string) => {
    setProfileTouched((p) => ({ ...p, [field]: true }));
    setProfileErrors((p) => ({ ...p, [field]: validateProfileField(field) }));
  };

  const profileSubmittingRef = useRef(false);
  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (profileSubmittingRef.current) return;
    const errors: FormErrors = {};
    if (!name.trim()) errors.name = "Name is required";
    if (!email.trim()) errors.email = "Email is required"; else if (!validateEmail(email.trim())) errors.email = "Please enter a valid email address";
    setProfileErrors(errors);
    if (Object.keys(errors).length > 0) return;

    profileSubmittingRef.current = true;
    setProfileSaving(true);
    try {
      const ok = await updateProfile({ name: name.trim(), email: email.trim(), bio: bio.trim(), phone: phone.trim(), location: location.trim() });
      setToast({ show: true, type: ok ? "success" : "error", message: ok ? "Profile updated successfully!" : "Failed to update profile." });
    } catch {
      setToast({ show: true, type: "error", message: "An error occurred. Please try again." });
    } finally {
      profileSubmittingRef.current = false;
      setProfileSaving(false);
    }
  };

  const getInitials = (n: string) => n.split(" ").map((x) => x[0]).join("").toUpperCase().slice(0, 2);

  if (isLoading) return <SettingsSkeleton />;

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Settings</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage your account and appearance preferences.</p>
        </div>
        <Link href="#" className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700">
          Upgrade to Pro
        </Link>
      </div>

      {toast.show && (
        <div className={cn(
          "fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border transition",
          toast.type === "success"
            ? "bg-success-50 dark:bg-success-500/10 border-success-500/20 text-success-700 dark:text-success-500"
            : "bg-danger-50 dark:bg-danger-500/10 border-danger-500/20 text-danger-700 dark:text-danger-600"
        )}>
          {toast.type === "success" ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
          <span className="text-sm font-medium">{toast.message}</span>
          <button onClick={() => setToast((p) => ({ ...p, show: false }))} className="ml-2 opacity-60 hover:opacity-100" aria-label="Close notification">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Profile */}
      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary-50 dark:bg-primary-500/10">
            <User className="h-5 w-5 text-primary-600 dark:text-primary-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Profile</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Your personal information and public profile.</p>
          </div>
        </div>

        <form onSubmit={handleProfileSave} noValidate>
          <div className="flex items-center gap-6 mb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-primary-100 dark:bg-primary-500/20 flex items-center justify-center text-primary-600 dark:text-primary-400 text-xl font-bold">
                {user ? getInitials(name || user.name) : "?"}
              </div>
              <button type="button" className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-primary-600 text-white hover:bg-primary-700" title="Upload avatar">
                <Camera className="h-3.5 w-3.5" />
              </button>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Profile Photo</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">JPG, PNG or GIF. Max size 2MB.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="settings-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Full Name <span className="text-danger-600">*</span></label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-gray-400" />
                </div>
                <input id="settings-name" type="text" value={name} onChange={(e) => { setName(e.target.value); if (profileTouched.name) setProfileErrors((p) => ({ ...p, name: validateProfileField("name", e.target.value) })); }} onBlur={() => handleProfileBlur("name")} className={cn("input-field pl-10", profileErrors.name && "border-danger-500 focus:ring-danger-500 focus:border-danger-500")} placeholder="Enter your full name" />
              </div>
              {profileErrors.name && (
                <p className="mt-1 text-xs text-danger-600 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{profileErrors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="settings-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email Address <span className="text-danger-600">*</span></label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-gray-400" />
                </div>
                <input id="settings-email" type="email" value={email} onChange={(e) => { setEmail(e.target.value); if (profileTouched.email) setProfileErrors((p) => ({ ...p, email: validateProfileField("email", e.target.value) })); }} onBlur={() => handleProfileBlur("email")} className={cn("input-field pl-10", profileErrors.email && "border-danger-500 focus:ring-danger-500 focus:border-danger-500")} placeholder="Enter your email" />
              </div>
              {profileErrors.email && (
                <p className="mt-1 text-xs text-danger-600 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{profileErrors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="settings-bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Bio</label>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <FileText className="h-4 w-4 text-gray-400" />
                </div>
                <textarea id="settings-bio" value={bio} onChange={(e) => setBio(e.target.value)} rows={3} className="input-field pl-10 resize-none" placeholder="Write a short bio about yourself..." />
              </div>
              <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">{bio.length}/200 characters</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="settings-phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Phone</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-4 w-4 text-gray-400" />
                  </div>
                  <input id="settings-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="input-field pl-10" placeholder="+1 (555) 000-0000" />
                </div>
              </div>
              <div>
                <label htmlFor="settings-location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Location</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-4 w-4 text-gray-400" />
                  </div>
                  <input id="settings-location" type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="input-field pl-10" placeholder="San Francisco, CA" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button type="submit" disabled={profileSaving} className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
              {profileSaving ? (<><Loader2 className="h-4 w-4 animate-spin" />Saving...</>) : (<><Save className="h-4 w-4" />Save Changes</>)}
            </button>
          </div>
        </form>
      </div>

      {/* Appearance */}
      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-info-50 dark:bg-info-500/10">
            <Palette className="h-5 w-5 text-info-600 dark:text-info-500" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Appearance</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Customize the look and feel of the dashboard.</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Theme</label>
            <div className="grid grid-cols-3 gap-3">
              {(["light", "dark", "system"] as const).map((t) => (
                <button key={t} type="button" onClick={() => setTheme(t)} className={cn("flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all", theme === t ? "border-primary-600 bg-primary-50 dark:bg-primary-500/10" : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600")}>
                  <div className={cn("w-8 h-8 rounded-full", t === "light" && "bg-yellow-100 text-yellow-600", t === "dark" && "bg-gray-800 text-gray-200", t === "system" && "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300")} />
                  <span className={cn("text-sm font-medium capitalize", theme === t ? "text-primary-600 dark:text-primary-400" : "text-gray-600 dark:text-gray-400")}>{t}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Color Preset</label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {([
                { key: "ocean" as BaseColorTheme, label: "Ocean", colors: ["#90b1d0", "#668eb6", "#416e9b", "#1e3a5f", "#19314f"] },
                { key: "sunset" as BaseColorTheme, label: "Sunset", colors: ["#ffb19f", "#ff8e75", "#f47257", "#e8634a", "#d4523b"] },
                { key: "forest" as BaseColorTheme, label: "Forest", colors: ["#90cbb1", "#66b293", "#429976", "#2d6a4f", "#245742"] },
                { key: "lavender" as BaseColorTheme, label: "Lavender", colors: ["#c4aee2", "#a88fd4", "#8d70c5", "#7c5cbf", "#6a4aa8"] },
                { key: "slate" as BaseColorTheme, label: "Slate", colors: ["#94a3b8", "#78899e", "#64748b", "#475569", "#3b4a5c"] },
              ]).map((t) => (
                <button key={t.key} type="button" onClick={() => setColorTheme(t.key)} className={cn("group relative flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all", baseColorTheme === t.key ? "border-primary-600 bg-primary-50 dark:bg-primary-500/10" : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600")} title={t.label}>
                  <div className="w-full h-10 rounded-md overflow-hidden grid grid-cols-5">
                    {t.colors.map((c, i) => (<div key={i} className="h-full" style={{ backgroundColor: c }} />))}
                  </div>
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="language-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Language</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Globe className="h-4 w-4 text-gray-400" />
              </div>
              <select id="language-select" value={language} onChange={(e) => setLanguage(e.target.value)} className="input-field pl-10 appearance-none cursor-pointer">
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="pt">Portuguese</option>
                <option value="ja">Japanese</option>
                <option value="zh">Chinese</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Pro-only sections notice */}
      <div className="card border-dashed border-primary-300 dark:border-primary-800">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-primary-50 dark:bg-primary-500/10"><Lock className="h-5 w-5 text-primary-600 dark:text-primary-400" /></div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">More settings in Pro</h2>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">Notifications, Password & Security, and Danger Zone are available in the Pro version.</p>
        <Link href="#" className="mt-4 inline-flex items-center justify-center px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700">Upgrade to Pro</Link>
      </div>
    </div>
  );
}
