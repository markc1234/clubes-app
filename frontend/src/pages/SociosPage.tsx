import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Drawer from "../components/Drawer";
import { StyledEngineProvider } from "@mui/material/styles";
import { useSupabase } from "../components/SupabaseContext";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Checkbox,
  Avatar,
} from "@mui/material";
import { Edit, Delete, Add, Search } from "@mui/icons-material";

const SociosPage = () => {
  const supabase = useSupabase();
  const [socios, setSocios] = useState([]);
  const [filteredSocios, setFilteredSocios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSocio, setCurrentSocio] = useState(null);

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [documento, setDocumento] = useState("");
  const [email, setEmail] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [activo, setActivo] = useState(true);
  const [foto, setFoto] = useState("");

  const fetchSocios = async () => {
    try {
      const { data, error } = await supabase.from("socio").select("*");
      if (error) throw error;
      setSocios(data || []);
      setFilteredSocios(data || []);
    } catch (error) {
      console.error("Error al obtener los socios:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSocio = async () => {
    try {
      if (currentSocio) {
        const { error } = await supabase
          .from("socio")
          .update({
            nombre,
            apellido,
            documento,
            email,
            fecha_nacimiento: fechaNacimiento,
            activo,
            foto,
          })
          .eq("id", currentSocio.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("socio")
          .insert({
            nombre,
            apellido,
            documento,
            email,
            fecha_nacimiento: fechaNacimiento,
            activo,
            foto,
          });
        if (error) throw error;
      }
      setOpenDialog(false);
      fetchSocios();
    } catch (error) {
      console.error("Error al guardar el socio:", error);
    }
  };

  const handleDeleteSocio = async (id) => {
    try {
      const { error } = await supabase.from("socio").delete().eq("id", id);
      if (error) throw error;
      fetchSocios();
    } catch (error) {
      console.error("Error al eliminar el socio:", error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      setFilteredSocios(
        socios.filter(
          (socio) =>
            socio.nombre.toLowerCase().includes(query.toLowerCase()) ||
            socio.apellido.toLowerCase().includes(query.toLowerCase()) ||
            socio.documento.toLowerCase().includes(query.toLowerCase()) ||
            socio.email.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setFilteredSocios(socios);
    }
  };

  const openDialogHandler = (socio = null) => {
    setCurrentSocio(socio);
    if (socio) {
      setNombre(socio.nombre);
      setApellido(socio.apellido);
      setDocumento(socio.documento);
      setEmail(socio.email);
      setFechaNacimiento(socio.fecha_nacimiento);
      setActivo(socio.activo);
      setFoto(socio.foto);
    } else {
      setNombre("");
      setApellido("");
      setDocumento("");
      setEmail("");
      setFechaNacimiento("");
      setActivo(true);
      setFoto("");
    }
    setOpenDialog(true);
  };

  useEffect(() => {
    fetchSocios();
  }, []);

  return (
    <React.Fragment>
      <Container sx={{ marginTop: 2 }}>
        <StyledEngineProvider injectFirst>
          <Drawer />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Typography variant="h4" gutterBottom>
              Socios
            </Typography>
            <TextField
              placeholder="Buscar socios..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              InputProps={{
                startAdornment: <Search style={{ marginRight: 8 }} />,
              }}
            />
            <IconButton
              color="primary"
              onClick={() => openDialogHandler()}
              aria-label="Agregar nuevo socio"
            >
              <Add />
            </IconButton>
          </div>
          <TableContainer component={Paper} sx={{ marginTop: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>Documento</b></TableCell>
                  <TableCell><b>Nombre</b></TableCell>
                  <TableCell><b>Apellido</b></TableCell>
                  <TableCell><b>Email</b></TableCell>
                  <TableCell align="right"><b>Acciones</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      Cargando socios...
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSocios.map((socio) => (
                    <TableRow key={socio.id}>
                      <TableCell>{socio.documento}</TableCell>
                      <TableCell>{socio.nombre}</TableCell>
                      <TableCell>{socio.apellido}</TableCell>
                      <TableCell>{socio.email}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          color="primary"
                          onClick={() => openDialogHandler(socio)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          sx={{ color: "red" }}
                          onClick={() => handleDeleteSocio(socio.id)}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogTitle>
              {currentSocio ? "Editar Socio" : "Crear Nuevo Socio"}
            </DialogTitle>
            <DialogContent>
              <TextField
                  margin="dense"
                  label="Documento"
                  fullWidth
                  value={documento}
                  onChange={(e) => setDocumento(e.target.value)}
              />
              <TextField
                autoFocus
                margin="dense"
                label="Nombre"
                fullWidth
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              <TextField
                margin="dense"
                label="Apellido"
                fullWidth
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
              />
              <TextField
                margin="dense"
                label="Email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="dense"
                label="Fecha de Nacimiento"
                fullWidth
                type="date"
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                margin="dense"
                label="URL Foto"
                fullWidth
                value={foto}
                onChange={(e) => setFoto(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
              <Button onClick={handleSaveSocio} color="primary">
                Guardar
              </Button>
            </DialogActions>
          </Dialog>
        </StyledEngineProvider>
      </Container>
    </React.Fragment>
  );
};

export default SociosPage;
