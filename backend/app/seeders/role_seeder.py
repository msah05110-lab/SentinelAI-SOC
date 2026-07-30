from sqlalchemy.orm import Session

from app.models.role import Role


DEFAULT_ROLES = [
    {
        "role_name": "Admin",
        "description": "System Administrator"
    },
    {
        "role_name": "SOC Analyst",
        "description": "Security Operations Center Analyst"
    },
    {
        "role_name": "Manager",
        "description": "Security Manager"
    },
    {
        "role_name": "Viewer",
        "description": "Read Only User"
    }
]


def seed_roles(db: Session):
    """
    Insert default roles if they don't exist.
    """

    for role in DEFAULT_ROLES:

        existing_role = (
            db.query(Role)
            .filter(Role.role_name == role["role_name"])
            .first()
        )

        if not existing_role:

            db.add(
                Role(
                    role_name=role["role_name"],
                    description=role["description"]
                )
            )

    db.commit()