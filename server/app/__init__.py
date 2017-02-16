# coding: utf-8
from os.path import dirname, join
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

PROJECT_ROOT = dirname(__file__)
RESOURCES_ROOT = join(dirname(PROJECT_ROOT), 'resources')
FILES_ROOT = join(RESOURCES_ROOT, 'files')

DB_PATH = join(RESOURCES_ROOT, 'db', 'pdo-server.db')

