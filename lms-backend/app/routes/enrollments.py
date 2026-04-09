from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import schemas, crud, models
from app.deps import get_db, get_current_user

router = APIRouter(tags=["enrollments"])

@router.post("/courses/{id}/enroll")
def enroll_in_course(id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    if current_user.role != "student":
        raise HTTPException(status_code=403, detail="Only students can enroll")
    
    course = db.query(models.Course).filter(models.Course.id == id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
        
    existing = crud.get_enrollment(db, current_user.id, id)
    if existing:
        raise HTTPException(status_code=400, detail="Already enrolled")
        
    enrollment = crud.enroll_student(db, current_user.id, id)
    return {"msg": "Successfully enrolled", "enrollment_id": enrollment.id}
