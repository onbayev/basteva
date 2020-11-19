from sqlalchemy.dialects.postgresql import JSON
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class BaseModel(db.Model):
    """Base data model for all objects"""
    __abstract__ = True

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def __repr__(self):
        """Define a base way to print models"""
        return '%s(%s)' % (self.__class__.__name__, {
            column: value
            for column, value in self._to_dict().items()
        })

    def json(self):
        """
                Define a base way to jsonify models, dealing with datetime objects
        """
        return {
            column: value if not isinstance(value, datetime.date) else value.strftime('%Y-%m-%d')
            for column, value in self._to_dict().items()
        }

class Instance(BaseModel, db.Model):
    """Model for the stations table"""
    __tablename__ = 'instance'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String())
    ip = db.Column(db.String())
    fqdn = db.Column(db.String())
    user = db.Column(db.String())
    password = db.Column(db.String())
    ssh_key = db.Column(db.String())
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

