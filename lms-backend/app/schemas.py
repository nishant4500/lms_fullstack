from pydantic import BaseModel, EmailStr, Field
from typing import Literal

class UserCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=6, max_length=128)
    role: Literal["student", "instructor"]


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class CourseCreate(BaseModel):
    title: str = Field(..., min_length=3, max_length=100)
    description: str = Field(..., min_length=10, max_length=1000)

class ModuleCreate(BaseModel):
    title: str = Field(..., min_length=3, max_length=100)
    content: str = Field(..., min_length=10)
    course_id: int = Field(..., gt=0)

class EnrollmentCreate(BaseModel):
    course_id: int = Field(..., gt=0)

class AssignmentCreate(BaseModel):
    title: str = Field(..., min_length=3, max_length=100)
    description: str = Field(..., min_length=10)
    course_id: int = Field(..., gt=0)

class SubmissionCreate(BaseModel):
    content: str = Field(..., min_length=1)