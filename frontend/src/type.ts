import React, { ReactNode } from "react";

export interface JobOptions {
    title: string;
    responsibilities: string;
    why: string;
}

export interface skillsToLearn {
    title: string;
    why: string;
    how: string;
}

export interface SkillCategory {
    category: string;
    skills: skillsToLearn[];
}

export interface LearningApproach {
    title: string;
    points: string[];
}

export interface CareerGuideResponse {
    summary: string;
    jobOptions: JobOptions[];
    skillsToLearn: SkillCategory[];
    learningApproaches: LearningApproach[];
}

export interface ScoreBreakdown {
    formatting:{score: number; feedback: string};
    keywords:{score: number; feedback: string};
    structure:{score: number; feedback: string};
    reliability:{score: number; feedback: string};
}

export interface Suggestion{
    category: string;
    issue: string;
    recommendation:string;
    priority: "high" | "medium" | "low";
}

export interface ResumeAnalysisResponse{
    atsScore: number;
    scoreBreakdown: ScoreBreakdown;
    suggestions: Suggestion[];
    strengths : string[];
    summary: string;
}

export interface User{
    user_id:number;
    name:string;
    email:string;
    phone_number:string;
    role:"jobseeker" | "recruiter";
    bio:string | null;
    resume:string | null;
    resume_public_id:string | null;
    profile_pic:string | null;
    profile_pic_public_id:string | null;
    skills: string[];
    subscription:string | null;

}

export interface Application {
    application_id: number;
    applicant_id: number;
    applicant_email: string;
    job_id: number;
    resume: string;
    status: string;
    subscribed: boolean;
    created_at: string;
    job_title?: string;
    job_salary?: number;
    job_location?: string;
}

export interface AppContextType{
    user: User | null;
    loading: boolean;
    btnLoading: boolean;
    isAuth: boolean;
    setUser : React.Dispatch<React.SetStateAction<User | null>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface AppProviderProps{
    children: ReactNode;
}
